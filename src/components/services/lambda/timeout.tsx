const Timeout = {
  description: (
    <>
      <p>
        Lambda functions have a maximum time limit of 15 minutes before the
        invocation is cancelled. It's common to set the timeout much lower than
        this. There are several reasons to consider setting a lower timeout.
      </p>
      <ul>
        <li>
          <p>
            <strong>Cost</strong>
          </p>
          <p>
            Setting a lower timeout for your function can be an important part
            of cost control.
          </p>
        </li>
      </ul>
    </>
  ),
  title: 'Timeout',
};

export default Timeout;
