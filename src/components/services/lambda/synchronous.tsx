const Synchronous = {
  description: (
    <p>
      This is the request-response model commonly associated with API Gateway
      and msot Step Functions integrations. In this model, your function runs in
      its entirety and completes before returning a response to the calling
      service. Error-handling for synchronous requests is usually done in the
      form of HTTP codes such as a 4XX code for invalid input or a 5XX code for
      a service error.
    </p>
  ),
  title: 'Synchronous',
};

export default Synchronous;
