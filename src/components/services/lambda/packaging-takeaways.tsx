import Link from '@/components/ui/link';

const PackagingTakeaways = {
  description: (
    <p>
      I don't dispute any of AJ's conclusions, but in my personal experience,
      small zip bundles can perform very well and have the best developer
      experience. You can have a nice feedback loop using{' '}
      <Link href="https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-watch.html">
        CDK Watch
      </Link>{' '}
      or{' '}
      <Link href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-sync.html">
        SAM Accelerate
      </Link>
      .
    </p>
  ),
  title: 'Takeaways',
};

export default PackagingTakeaways;
