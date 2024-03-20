import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as table from 'aws-cdk-lib/aws-dynamodb';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface DynamoDBStackProps extends cdk.StackProps {
    readonly stage: string;
}

export class DynamodbStack extends cdk.Stack {
    public readonly tableName: cdk.CfnOutput;
    public readonly tableArn: cdk.CfnOutput;
    public readonly tableMain: table.Table;
    constructor(scope: Construct, id: string, props: DynamoDBStackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        //table
        this.tableMain = new table.Table(this, "HelloMotor", {
            partitionKey: { name: "name", type: table.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });

        const newTable = new table.Table(this, `${props.stage}-tableName`, {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            partitionKey: {
                name: 'PK',
                type: table.AttributeType.STRING
            },
            sortKey: {
                name: 'SK',
                type: table.AttributeType.STRING
            }
        })

        const gsi1: table.GlobalSecondaryIndexProps = {
            indexName: 'GSI1',
            partitionKey: {
                name: 'GSI1PK',
                type: table.AttributeType.STRING
            },
            sortKey: {
                name: 'GSI1SK',
                type: table.AttributeType.STRING
            },
            readCapacity: 10,
            writeCapacity: 20
        }

        newTable.addGlobalSecondaryIndex(gsi1);

        const gsi2: table.GlobalSecondaryIndexProps = {
            indexName: 'GSI2',
            partitionKey: {
                name: 'GSI2PK',
                type: table.AttributeType.STRING
            },
            sortKey: {
                name: 'GSI2SK',
                type: table.AttributeType.NUMBER
            },
            readCapacity: 100,
            writeCapacity: 20
        }

        newTable.addGlobalSecondaryIndex(gsi2);

        const gsi3: table.GlobalSecondaryIndexProps = {
            indexName: 'GSI3',
            partitionKey: {
                name: 'GSI3PK',
                type: table.AttributeType.STRING
            },
            sortKey: {
                name: 'GSI23K',
                type: table.AttributeType.STRING
            },
            readCapacity: 10,
            writeCapacity: 10
        }

        newTable.addGlobalSecondaryIndex(gsi3);

        this.tableName = new cdk.CfnOutput(this, 'tableName', {
            value: newTable.tableName
        });

        this.tableArn = new cdk.CfnOutput(this, 'tableArn', {
            value: newTable.tableArn
        })

    }
}
