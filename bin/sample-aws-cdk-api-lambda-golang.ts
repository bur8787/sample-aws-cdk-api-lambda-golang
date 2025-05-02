#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SampleAwsCdkApiLambdaGolangStack } from '../lib/sample-aws-cdk-api-lambda-golang-stack';

const app = new cdk.App();
new SampleAwsCdkApiLambdaGolangStack(app, 'SampleAwsCdkApiLambdaGolangStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-northeast-1',
  },
  baseDomainName: 'example.com',
  subDomainName: 'api',
});
