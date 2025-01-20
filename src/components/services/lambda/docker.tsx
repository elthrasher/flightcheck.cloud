import Link from '@/components/ui/link';

const Docker = {
  description: (
    <>
      <p>
        Lambda introduced{' '}
        <Link href="https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/">
          Docker image support
        </Link>{' '}
        in 2020. Docker packaging supports much larger bundles of up to 10 GB.
        Docker runtimes will make available whatever languages, libraries, and
        tools get installed in the Dockerfile. If you are working with a
        function that is very large, want to use a non-standard runtime, or have
        unusual OS requirements, then it is a good idea to choose a Docker
        runtime.
      </p>
      <p>
        Which is better for standard use cases? It very much depends. AJ
        Stuyvenberg makes the case that{' '}
        <Link href="https://aaronstuyvenberg.com/posts/containers-on-lambda">
          Containers are better
        </Link>
        . Nevertheless Zip deployments remain ubiquitious, probably because they
        are very simple and simplicity is always a good choice.
      </p>
    </>
  ),
  title: 'Docker',
};

export default Docker;
