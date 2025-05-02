# Sample AWS CDK API Lambda Golang

This is a sample AWS CDK project that creates an API Gateway integrated with a Lambda function written in Go. The Lambda function is triggered by HTTP requests sent to the API Gateway.

The project also adds the subdomain api to a pre-existing hosted zone in Route 53 and associates it with the created API Gateway.

## Prerequisites
- AWS CDK installed
- AWS CLI configured
- Node.js installed
- Go installed

## How to deploy

First, specify the domain name that has already been created in Route 53 by setting the `baseDomainName` variable in `bin/sample-api-lambda-golang.ts`.

Then, deploy the API Gateway and Lambda function by running the following command:

```bash
$ make deploy
```
