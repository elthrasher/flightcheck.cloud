import { App } from 'aws-cdk-lib';
import { FlightcheckCloudStack } from './flightcheck.cloud.stack';

const app = new App();

new FlightcheckCloudStack(app, 'FlightcheckCloudStack', {
  description: 'Flightcheck Cloud Stack',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: 'flightcheck-cloud',
});
