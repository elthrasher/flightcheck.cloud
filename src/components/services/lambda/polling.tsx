const Polling = {
  description: (
    <>
      {' '}
      <p>
        The Lambda service has an internal poller which is used when integrating
        with streams such as SQS, Kinesis or DynamoDB streams. Although to us
        this model is asynchronous, it creates a synchronous invocation. This
        has the advantage that the message is put back into the queue in the
        event of an error; the stream will be able to tell an error has been
        thrown and return the message for visibility.
      </p>
      <p>
        The result of this style of integration is that messages can be far more
        durable in the face of a downstream error or service outage. It is
        common to place SQS at integration points to ensure messages are not
        lost.
      </p>
    </>
  ),
  title: 'Polling',
};

export default Polling;
