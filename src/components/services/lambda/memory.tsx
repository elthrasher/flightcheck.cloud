import Link from '@/components/ui/link';

const Memory = {
  description: (
    <>
      <p>
        A Lambda function can be configured to run between 128 MB and 10 GB of
        memory. vCPU and cost scale linerally with the memory size of a
        function.
      </p>
      <p>
        Selecting the right memory size for your function can involve guesswork
        and experimentation. If you set the memory size too low, you may get
        Out-Of-Memory exceptions. If you set it too high, you are wasting money.
        The simplest thing to do is invoke the function with what you believe
        will be a standard workload and see how much memory it takes. The log
        output of the function (viewable in CloudWatch) will list the memory
        used. If your invocation is very close to the limit, it would be
        advisible to increase the limit.
      </p>
      <p>
        Increasing the memory size of a function can sometimes make the function
        execute faster. Since Lambda is billed per milisecond of execution, this
        can sometimes have the effect of making the function faster and cheaper.
        What's not to like? It's a good idea to experiment with higher memory
        settings to see what kind of performance improvement you can get. You
        may also decide to pay a little extra for better performance.
      </p>
      <p>
        <Link href="https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:451282441545:applications~aws-lambda-power-tuning">
          Lambda Powertuning
        </Link>{' '}
        is a tool that can help determine the optimal memory size for a
        function.
      </p>
    </>
  ),
  title: 'Memory',
};

export default Memory;
