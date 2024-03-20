import { APIGatewayProxyEventV2, Handler } from 'aws-lambda';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE_NAME: string = process.env.HELLO_TABLE_NAME!;

export const handler: Handler = async (event: APIGatewayProxyEventV2, context) => {
    console.log(TABLE_NAME);
    const method = event.requestContext.http.method;

    if (method === 'GET') {
        return await getHello(event)
    } else if (method === 'POST') {
        return await save(event);
    } else {
        return {
            statusCode: 400,
            body: 'Not a valid operation'
        };
    }
};

async function save(event: any) {
    const name = event.queryStringParameters.name;

    const item = {
        name: name,
        date: Date.now(),
    };

    console.log(item);
    const savedItem = await saveItem(item);

    return {
        statusCode: 200,
        body: JSON.stringify(savedItem),
    };
};

async function getHello(event: any) {
    const name = event.queryStringParameters.name;

    const item = await getItem(name);

    if (item !== undefined && item.date) {
        const d = new Date(item.date);

        const message = `Was greeted on ${d.getDate()}/${d.getMonth() + 1
            }/${d.getFullYear()}`;

        return {
            statusCode: 200,
            body: JSON.stringify(message),
        };

    } else {

        const message = "Nobody was greeted with that name";
        return {
            statusCode: 200,
            body: JSON.stringify(message),
        };
    }
};

async function getItem(name: string) {

    const params = new GetCommand({
        Key: {
            name: name,
        },
        TableName: TABLE_NAME,
    });

    const getSR = await dynamo.send(params)
    return getSR.Item;
}

async function saveItem(item: any) {

    const params = new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
    });

    return dynamo.send(params)
        .then((item) => {
            return item;
        });
}