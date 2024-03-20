import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Runtime, Function, Code } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LambdaStackProps extends cdk.StackProps {
    readonly stage?: string;
}

export class JoLambdaStack extends cdk.Stack {
    public readonly joLambda: NodejsFunction;
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        this.joLambda = new NodejsFunction(this, 'S3LambdaHandler', {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../functions/jo-lambda.ts'),
            handler: 'handler',
        })

        // const tsLambda = new Function(this, 'tsLambda', {
        //     runtime: Runtime.NODEJS_18_X,
        //     handler: 'handler',
        //     code: Code.fromAsset(path.join(__dirname, '../functions/ts-lambda')),
        // })
    }
}
