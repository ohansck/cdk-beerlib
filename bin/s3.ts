#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/s3-stack';
import { DynamodbStack } from '../lib/dynamodb-stack';
import { LambdaStack } from '../lib/typescript-lambda';
import { JoS3Stack } from '../lib/jo-s3-stack';
import { JoLambdaStack } from '../lib/jo-lambda-stack';

const app = new cdk.App();

const joLambda = new JoLambdaStack(app, 'JoLambdaStack', {
    stage: 'dev'
})

const joS3 = new JoS3Stack(app, 'JoS3Stack', {
    lambda: joLambda.joLambda,
    s3_num: 6
});
// const s3 = new S3Stack(app, 'S3Stack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

// const dynamodb = new DynamodbStack(app, 'DynamoDBStack', {
//   stage: 'dev'
// })

// const lambda = new LambdaStack(app, 'LambdaStack', {
//   table: dynamodb.tableMain,
//   stage: 'dev-rel'
// }) 