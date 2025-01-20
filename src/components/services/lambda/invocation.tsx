import Link from '@/components/ui/link';

const InvocationModel = {
  description: (
    <p>
      Learning the invocation models of Lambda helps us understand how to scale
      horizontally and handle errors. See also{' '}
      <Link href="https://aws.amazon.com/blogs/architecture/understanding-the-different-ways-to-invoke-lambda-functions/">
        Understanding the Different Ways to Invoke Lambda Functions
      </Link>{' '}
      by George Mao.
    </p>
  ),
  title: 'Overview',
};

export default InvocationModel;
