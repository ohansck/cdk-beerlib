import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface JoS3StackProps extends cdk.StackProps {
    readonly lambda: NodejsFunction;
    readonly s3_num: number;

}

export class JoS3Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: JoS3StackProps) {
        super(scope, id, props);

        for (let index = 0; index < props.s3_num; index++) {
            const bucket_name = `jo-data-s3-${index}`
            const imageS3 = new s3.Bucket(this, bucket_name, {
                bucketName: bucket_name,
                blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
                versioned: true,
                removalPolicy: cdk.RemovalPolicy.DESTROY,
                autoDeleteObjects: true,
            })

            imageS3.addEventNotification(s3.EventType.OBJECT_CREATED, new LambdaDestination(props.lambda))
        }
    }
}
