import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, test } from 'vitest';

import { FlightcheckCloudStack } from './flightcheck.cloud.stack';

describe('Entire Stack', () => {
  test('match a snapshot', () => {
    const app = new App();
    const stack = new FlightcheckCloudStack(app, 'test-stack', {
      env: {
        account: '1234567890',
        region: 'us-east-1',
      },
    });
    const template = Template.fromStack(stack);

    expect(template).toMatchSnapshot();
  });
});
