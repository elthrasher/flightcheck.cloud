import * as React from 'react';
import { Button } from './ui/button';

interface ServiceDetail {
  title: string;
  description: string;
  documentation: string;
  options?: {
    id: string;
    name: string;
    description: string;
    useCases: string[];
  }[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  lambda: {
    title: 'AWS Lambda',
    description:
      'AWS Lambda is a serverless compute service that runs your code in response to events.',
    documentation: 'https://docs.aws.amazon.com/lambda/',
    options: [
      {
        id: 'sync',
        name: 'Synchronous Invocation',
        description: 'Direct function invocation that waits for the result',
        useCases: [
          'API Gateway integrations',
          'Application Load Balancer targets',
          'Cognito triggers',
        ],
      },
      {
        id: 'async',
        name: 'Asynchronous Invocation',
        description: "Event-driven invocation that doesn't wait for the result",
        useCases: [
          'S3 event notifications',
          'EventBridge events',
          'SNS notifications',
        ],
      },
    ],
  },
  s3: {
    title: 'Amazon S3',
    description:
      'Amazon S3 is an object storage service offering industry-leading scalability, data availability, security, and performance.',
    documentation: 'https://docs.aws.amazon.com/s3/',
    options: [
      {
        id: 'static-website',
        name: 'Static Website Hosting',
        description: 'Host static websites directly from an S3 bucket',
        useCases: [
          'Single page applications (SPAs)',
          'Static marketing sites',
          'Documentation hosting',
        ],
      },
      {
        id: 'data-lake',
        name: 'Data Lake Storage',
        description:
          'Store and analyze large amounts of structured and unstructured data',
        useCases: [
          'Big data analytics',
          'Machine learning datasets',
          'Log and backup storage',
        ],
      },
    ],
  },
  dynamodb: {
    title: 'Amazon DynamoDB',
    description:
      'Amazon DynamoDB is a fully managed NoSQL database service providing fast and predictable performance with seamless scalability.',
    documentation: 'https://docs.aws.amazon.com/dynamodb/',
    options: [
      {
        id: 'on-demand',
        name: 'On-Demand Capacity',
        description: 'Pay-per-request pricing for unpredictable workloads',
        useCases: [
          'Serverless applications',
          'Development environments',
          'New applications with unknown traffic patterns',
        ],
      },
      {
        id: 'provisioned',
        name: 'Provisioned Capacity',
        description:
          'Specified read and write capacity for predictable workloads',
        useCases: [
          'Production applications with predictable traffic',
          'Cost-optimized workloads',
          'Applications requiring reserved capacity',
        ],
      },
    ],
  },
  sqs: {
    title: 'Amazon SQS',
    description:
      'Amazon Simple Queue Service is a fully managed message queuing service for decoupling and scaling microservices.',
    documentation: 'https://docs.aws.amazon.com/sqs/',
    options: [
      {
        id: 'standard',
        name: 'Standard Queue',
        description: 'At-least-once delivery, best-effort ordering',
        useCases: [
          'Background job processing',
          'Work item distribution',
          'Request buffering',
        ],
      },
      {
        id: 'fifo',
        name: 'FIFO Queue',
        description: 'Exactly-once processing, strict ordering',
        useCases: [
          'Financial transactions',
          'Order processing systems',
          'Healthcare data processing',
        ],
      },
    ],
  },
  'api-gateway': {
    title: 'Amazon API Gateway',
    description:
      'Amazon API Gateway is a fully managed service for creating, publishing, and managing APIs at any scale.',
    documentation: 'https://docs.aws.amazon.com/apigateway/',
    options: [
      {
        id: 'rest',
        name: 'REST API',
        description: 'Traditional RESTful API endpoints',
        useCases: [
          'Web applications',
          'Mobile backends',
          'Public API services',
        ],
      },
      {
        id: 'http',
        name: 'HTTP API',
        description: 'Lighter-weight, lower-latency API option',
        useCases: [
          'Serverless applications',
          'Simple CRUD operations',
          'Proxy integrations',
        ],
      },
    ],
  },
  cloudfront: {
    title: 'Amazon CloudFront',
    description:
      'Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs globally.',
    documentation: 'https://docs.aws.amazon.com/cloudfront/',
    options: [
      {
        id: 'web-dist',
        name: 'Web Distribution',
        description: 'Optimize delivery of web content',
        useCases: [
          'Static website acceleration',
          'Dynamic content caching',
          'Security with WAF integration',
        ],
      },
      {
        id: 'rtmp',
        name: 'Media Streaming',
        description: 'Optimize delivery of streaming media',
        useCases: ['Video on demand', 'Live streaming', 'Audio streaming'],
      },
    ],
  },
};

export interface ServiceDetailsProps {
  serviceId: string;
  onBack: () => void;
}

export function ServiceDetails({ serviceId, onBack }: ServiceDetailsProps) {
  const service = serviceDetails[serviceId];
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack}>
        ← Back to services
      </Button>

      <div>
        <h1 className="text-2xl font-bold">{service.title}</h1>
        <p className="mt-2">{service.description}</p>
        <a
          href={service.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Official Documentation
        </a>
      </div>

      {service.options && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configuration Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.options.map((option) => (
              <Button
                key={option.id}
                variant={selectedOption === option.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col items-start text-left"
                onClick={() => setSelectedOption(option.id)}
              >
                <span className="font-semibold">{option.name}</span>
                <span className="text-sm mt-2">{option.description}</span>
              </Button>
            ))}
          </div>

          {selectedOption && (
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Common Use Cases:</h3>
              <ul className="list-disc list-inside">
                {service.options
                  .find((opt) => opt.id === selectedOption)
                  ?.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
