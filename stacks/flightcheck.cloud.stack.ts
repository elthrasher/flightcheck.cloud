import {
  AssetHashType,
  CfnOutput,
  DockerImage,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import {
  Distribution,
  S3OriginAccessControl,
  Signing,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  ARecord,
  PublicHostedZone,
  RecordTarget,
} from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { execSync, ExecSyncOptions } from 'child_process';
import { Construct } from 'constructs';
import { copySync } from 'fs-extra/esm';

export class FlightcheckCloudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessControl = new S3OriginAccessControl(
      this,
      'OriginAccessControl',
      { signing: Signing.SIGV4_NO_OVERRIDE }
    );

    const execOptions: ExecSyncOptions = {
      stdio: ['ignore', process.stderr, 'inherit'],
    };

    const bundle = Source.asset('src', {
      assetHashType: AssetHashType.OUTPUT,
      bundling: {
        command: [
          'sh',
          '-c',
          'echo "Docker build not supported. Please install esbuild."',
        ],
        image: DockerImage.fromRegistry('alpine'),
        local: {
          tryBundle(outputDir: string) {
            try {
              execSync('esbuild --version', execOptions);
            } catch /* istanbul ignore next */ {
              return false;
            }
            execSync('npm run build', execOptions);
            copySync('dist', outputDir);
            return true;
          },
        },
      },
    });

    const domainName = 'flightcheck.cloud';

    const hostedZone = PublicHostedZone.fromLookup(this, 'HostedZone', {
      domainName,
      privateZone: false,
    });

    const certificate = new Certificate(this, 'WebsiteCert', {
      domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const distribution = new Distribution(this, 'Distribution', {
      certificate,
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(websiteBucket, {
          originAccessControl,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: [domainName],
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new BucketDeployment(this, 'DeployWebsite', {
      destinationBucket: websiteBucket,
      distribution,
      sources: [bundle],
    });

    new ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    new CfnOutput(this, 'webUrl', {
      value: `https://${distribution.domainName}`,
    });
  }
}
