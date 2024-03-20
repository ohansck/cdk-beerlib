import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //S3
    const imageS3 = new s3.Bucket(this, 'codygo-images3-bucket', {
      bucketName: 'codygo-images3-bucket',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE
    })

    // example resource
    // const queue = new sqs.Queue(this, 'S3Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
