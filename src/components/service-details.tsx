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
import InvocationTakeaways from './services/lambda/invocation-takeaways';
import Polling from './services/lambda/polling';
import Packaging from './services/lambda/packaging';
import Zip from './services/lambda/zip';
import Docker from './services/lambda/docker';
import PackagingTakeaways from './services/lambda/packaging-takeaways';
import Memory from './services/lambda/memory';
import Timeout from './services/lambda/timeout';

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
        details: [Packaging, Zip, Docker, PackagingTakeaways],
        name: 'Packaging',
      },
      {
        details: [Memory],
        name: 'Memory Size',
      },
      {
        details: [Timeout],
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
