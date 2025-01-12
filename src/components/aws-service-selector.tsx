import { Button } from './ui/button';

interface AwsService {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const awsServices: AwsService[] = [
  {
    id: 'lambda',
    name: 'AWS Lambda',
    icon: 'λ',
    description: 'Serverless compute service',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    icon: '📦',
    description: 'Object storage service',
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    icon: '🗄️',
    description: 'NoSQL database service',
  },
  {
    id: 'sqs',
    name: 'Amazon SQS',
    icon: '📨',
    description: 'Message queuing service',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    icon: '🔗',
    description: 'API management service',
  },
  {
    id: 'cloudfront',
    name: 'CloudFront',
    icon: '🌐',
    description: 'Content delivery network',
  },
];

export interface AwsServiceSelectorProps {
  onServiceSelect: (service: AwsService) => void;
}

export function AwsServiceSelector({
  onServiceSelect,
}: AwsServiceSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {awsServices.map((service) => (
        <Button
          key={service.id}
          variant="outline"
          className="h-32 flex flex-col items-center justify-center gap-2 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => onServiceSelect(service)}
        >
          <span className="text-3xl">{service.icon}</span>
          <span className="font-medium text-center">{service.name}</span>
          <span className="text-sm text-center text-slate-600 dark:text-slate-400">
            {service.description}
          </span>
        </Button>
      ))}
    </div>
  );
}
