import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Runtime, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LambdaStackProps extends cdk.StackProps {
    readonly stage?: string;
    readonly table: Table;
}

export class LambdaStack extends cdk.Stack {
    public readonly lambdaUrl: cdk.CfnOutput;
    public readonly tableArn: cdk.CfnOutput;
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const lambda = new NodejsFunction(this, 'LambdaHandler', {
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../functions/function.ts'),
            handler: 'handler',
            environment: {
                HELLO_TABLE_NAME: props.table.tableName
            }
        })

        props.table.grantReadWriteData(lambda);

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
            cors: {
                allowedOrigins: ['*']
            }
        })

        this.lambdaUrl = new cdk.CfnOutput(this, 'lambdaUrl', {
            value: functionUrl.url
        });
        // example resource
        // const queue = new sqs.Queue(this, 'S3Queue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
    }
}
