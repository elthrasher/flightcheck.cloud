import { JSX } from 'react';

import Asynchronous from './services/lambda/aysynchronous';
import InvocationModel from './services/lambda/invocation';
import Synchronous from './services/lambda/synchronous';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from './ui/link';
import InvocationTakeaways from './services/lambda/invocation-summary';
import Polling from './services/lambda/polling';

interface ServiceDetailOption {
  details: {
    title: string;
    description: JSX.Element;
  }[];
  name: string;
  showDetail?: boolean;
}

interface ServiceDetail {
  title: string;
  description: string;
  documentation: string;
  options: ServiceDetailOption[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  lambda: {
    title: 'AWS Lambda',
    description:
      'AWS Lambda is a serverless compute service that runs your code in response to events.',
    documentation: 'https://docs.aws.amazon.com/lambda/',
    options: [
      {
        details: [
          InvocationModel,
          Synchronous,
          Asynchronous,
          Polling,
          InvocationTakeaways,
        ],
        name: 'Invocation Type',
      },
      {
        details: [
          {
            description: (
              <p>
                {' '}
                Lambda function code can be delivered to the Lambda service as
                Docker images or zip files.
              </p>
            ),
            title: 'Packaging',
          },
          {
            description: (
              <p>
                Zip files are the most common deployment method for Lambda
                functions. They allow functions of up to 50MB in size (zipped).
                Most zip functions use provided runtimes such as NodeJS, Java,
                or Python, though it's possible to use the Amazon Linux runtimes
                and install your own tool chain by means of a Lambda Layer.
              </p>
            ),
            title: 'Zip',
          },
          {
            description: (
              <>
                <p>
                  Docker runtimes are newer and provide a much larger size limit
                  at 10GB. Additionally Docker runtimes will make available
                  whatever languages, libraries, and tools get installed in the
                  Dockerfile. If you are working with a function that is very
                  large or you want to use a non-standard runtime or have
                  unusual OS requirements, then it is a good idea to choose a
                  Docker runtime.
                </p>
                <p>
                  Which is better for standard use cases? It very much depends.
                  AJ Stuyvenberg makes the case that{' '}
                  <Link href="https://aaronstuyvenberg.com/posts/containers-on-lambda">
                    Containers are better
                  </Link>
                  . Nevertheless Zip deployments remain ubiquitious, probably
                  because they are very simple and simplicity is always a good
                  choice.
                </p>
              </>
            ),
            title: 'Docker',
          },
        ],
        name: 'Packaging',
      },
      {
        details: [
          {
            description: (
              <>
                <p>
                  A Lambda function can be configured to run between 128 MB and
                  10 GB of memory. vCPU and cost scale linerally with the memory
                  size of a function.
                </p>
                <p>
                  Selecting the right memory size for your function can involve
                  guesswork and experimentation. If you set the memory size too
                  low, you may get Out-Of-Memory exceptions. If you set it too
                  high, you are wasting money. The simplest thing to do is
                  invoke the function with what you believe will be a standard
                  workload and see how much memory it takes. The log output of
                  the function (viewable in CloudWatch) will list the memory
                  used. If your invocation is very close to the limit, it would
                  be advisible to increase the limit.
                </p>
                <p>
                  Increasing the memory size of a function can sometimes make
                  the function execute faster. Since Lambda is billed per
                  milisecond of execution, this can sometimes have the effect of
                  making the function faster and cheaper. What's not to like?
                  It's a good idea to experiment with higher memory settings to
                  see what kind of performance improvement you can get. You may
                  also decide to pay a little extra for better performance.
                </p>
                <p>
                  <Link href="https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:451282441545:applications~aws-lambda-power-tuning">
                    Lambda Powertuning
                  </Link>{' '}
                  is a tool that can help determine the optimal memory size for
                  a function.
                </p>
              </>
            ),
            title: 'Memory',
          },
        ],
        name: 'Memory Size',
      },
      {
        details: [
          {
            description: (
              <>
                <p>
                  Lambda functions have a maximum time limit of 15 minutes
                  before the invocation is cancelled. It's common to set the
                  timeout much lower than this. There are several reasons to
                  consider setting a lower timeout.
                </p>
                <ul>
                  <li>
                    <p>
                      <strong>Cost</strong>
                    </p>
                    <p>
                      Setting a lower timeout for your function can be an
                      important part of cost control.
                    </p>
                  </li>
                </ul>
              </>
            ),
            title: 'Timeout',
          },
        ],
        name: 'Timeout',
      },
    ],
  },
  // s3: {
  //   title: 'Amazon S3',
  //   description:
  //     'Amazon S3 is an object storage service offering industry-leading scalability, data availability, security, and performance.',
  //   documentation: 'https://docs.aws.amazon.com/s3/',
  //   options: [
  //     {
  //       id: 'static-website',
  //       name: 'Static Website Hosting',
  //       description: 'Host static websites directly from an S3 bucket',
  //     },
  //     {
  //       id: 'data-lake',
  //       name: 'Data Lake Storage',
  //       description:
  //         'Store and analyze large amounts of structured and unstructured data',
  //     },
  //   ],
  // },
  // dynamodb: {
  //   title: 'Amazon DynamoDB',
  //   description:
  //     'Amazon DynamoDB is a fully managed NoSQL database service providing fast and predictable performance with seamless scalability.',
  //   documentation: 'https://docs.aws.amazon.com/dynamodb/',
  //   options: [
  //     {
  //       id: 'on-demand',
  //       name: 'On-Demand Capacity',
  //       description: 'Pay-per-request pricing for unpredictable workloads',
  //     },
  //     {
  //       id: 'provisioned',
  //       name: 'Provisioned Capacity',
  //       description:
  //         'Specified read and write capacity for predictable workloads',
  //     },
  //   ],
  // },
  // sqs: {
  //   title: 'Amazon SQS',
  //   description:
  //     'Amazon Simple Queue Service is a fully managed message queuing service for decoupling and scaling microservices.',
  //   documentation: 'https://docs.aws.amazon.com/sqs/',
  //   options: [
  //     {
  //       id: 'standard',
  //       name: 'Standard Queue',
  //       description: 'At-least-once delivery, best-effort ordering',
  //     },
  //     {
  //       id: 'fifo',
  //       name: 'FIFO Queue',
  //       description: 'Exactly-once processing, strict ordering',
  //     },
  //   ],
  // },
  // 'api-gateway': {
  //   title: 'Amazon API Gateway',
  //   description:
  //     'Amazon API Gateway is a fully managed service for creating, publishing, and managing APIs at any scale.',
  //   documentation: 'https://docs.aws.amazon.com/apigateway/',
  //   options: [
  //     {
  //       id: 'rest',
  //       name: 'REST API',
  //       description: 'Traditional RESTful API endpoints',
  //     },
  //     {
  //       id: 'http',
  //       name: 'HTTP API',
  //       description: 'Lighter-weight, lower-latency API option',
  //     },
  //   ],
  // },
  // cloudfront: {
  //   title: 'Amazon CloudFront',
  //   description:
  //     'Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs globally.',
  //   documentation: 'https://docs.aws.amazon.com/cloudfront/',
  //   options: [
  //     {
  //       id: 'web-dist',
  //       name: 'Web Distribution',
  //       description: 'Optimize delivery of web content',
  //     },
  //     {
  //       id: 'rtmp',
  //       name: 'Media Streaming',
  //       description: 'Optimize delivery of streaming media',
  //     },
  //   ],
  // },
};

export interface ServiceDetailsProps {
  serviceId: string;
  onBack: () => void;
}

export function ServiceDetails({ serviceId, onBack }: ServiceDetailsProps) {
  const service = serviceDetails[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack}>
        ← Back to services
      </Button>

      <div>
        <h1 className="text-2xl font-bold">{service.title}</h1>
        <p className="mt-2">{service.description}</p>
        <Link href={service.documentation}>Official Documentation</Link>
      </div>

      {service.options && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {service.options.map((option) => (
              <Card key={option.name}>
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion key={option.name} type="single" collapsible>
                    {option.details.map((detail) => (
                      <AccordionItem key={detail.title} value={detail.title}>
                        <AccordionTrigger>{detail.title}</AccordionTrigger>
                        <AccordionContent className="text-left">
                          {detail.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              // <div>
              //   <Button
              //     key={option.id}
              //     // variant={
              //     //   selectedOption?.id === option.id ? 'default' : 'outline'
              //     // }
              //     className="h-auto p-4 flex flex-col items-start text-left"
              //     onClick={() => {
              //       toggleDetail(option);
              //     }}
              //   >
              //     <span className="font-semibold">{option.name}</span>
              //   </Button>
              //   {option.showDetail && (
              //     <div className="mt-6 p-4 border rounded-lg">
              //       <div className="font-semibold mb-2">
              //         {option.description}
              //       </div>
              //     </div>
              //   )}
              // </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
