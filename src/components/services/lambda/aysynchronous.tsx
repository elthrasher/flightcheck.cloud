import Link from '@/components/ui/link';

const Asynchronous = {
  description: (
    <>
      {' '}
      <p>
        Your function will execute asynchronously. The calling service will only
        receive a 200 OK status code indicating the function was started
        successfully. It will not receive any of the output from your function.
        Your function will need to handle errors by notifying a downstream
        service or having dead-letter queue or a Lambda{' '}
        <Link href="https://aws.amazon.com/blogs/compute/introducing-aws-lambda-destinations">
          error destination
        </Link>{' '}
        configured. For a deeper dive on proper use of Dead Letter Queues with
        Lambda asynchronous invocations, see Jason Wadsworth's{' '}
        <Link href="https://dev.to/aws-builders/lambda-retries-and-dlqs-3ac4">
          Lambda Retries and Dead Letter Queues
        </Link>
        .
      </p>
      <p>
        If the function cannot be started, either due to no available
        concurrency or some other system error, it will be retried two more
        times.{' '}
        <Link href="https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html">
          More on error-handling.
        </Link>
      </p>
      <p>
        In addition to error-handling, it's important to understand that with
        asynchronous invocation, your function may be executed more than once.
        This can happen even if the execution doesn't result in an error. It's
        important to design your function to be idempotent, that is ensure the
        extra invocation has no side-effects. Alternately, you can implement
        idempotency checks using a library like{' '}
        <Link href="https://docs.powertools.aws.dev/lambda/typescript/latest/utilities/idempotency/">
          Lambda Powertools
        </Link>{' '}
        (also available in{' '}
        <Link href="https://docs.powertools.aws.dev/lambda/python/latest/utilities/idempotency/">
          Python
        </Link>
        ,{' '}
        <Link href="https://docs.powertools.aws.dev/lambda/dotnet/utilities/idempotency/">
          .NET
        </Link>
        , and{' '}
        <Link href="https://docs.powertools.aws.dev/lambda/java/utilities/idempotency/">
          Java
        </Link>
        ) .
      </p>
    </>
  ),
  title: 'Asynchronous',
};

export default Asynchronous;
