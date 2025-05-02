import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2integration from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as path from 'path';

export interface SampleAwsCdkApiLambdaGolangStackProps extends cdk.StackProps {
  baseDomainName: string;
  subDomainName: string;
}

export class SampleAwsCdkApiLambdaGolangStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SampleAwsCdkApiLambdaGolangStackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'MyGoLambda', {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    });


    const integration = new apigatewayv2integration.HttpLambdaIntegration('MyIntegration', lambdaFunction);
    const api = new apigatewayv2.HttpApi(this, "MyHttpApi", {
      defaultIntegration: integration
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.baseDomainName
    });

    const cert = new acm.Certificate(this, 'MyNewCert', {
      domainName: `*.${props.baseDomainName}`,
      validation: acm.CertificateValidation.fromDns(hostedZone)
    });

    const domain = new apigatewayv2.DomainName(this, 'MyDomain', {
      domainName: `${props.subDomainName}.${props.baseDomainName}`,
      certificate: cert
    });

    new apigatewayv2.ApiMapping(this, 'MyApiMapping', {
      api,
      domainName: domain,
    });

    new route53.ARecord(this, 'CustomDomainAliasRecord', {
      zone: hostedZone,
      recordName: 'api',
      target: route53.RecordTarget.fromAlias(new targets.ApiGatewayv2DomainProperties(
        domain.regionalDomainName,
        domain.regionalHostedZoneId
      ))
    });
  }
}

