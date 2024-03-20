import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Event, S3Handler } from "aws-lambda";

const s3Client = new S3Client(); // Replace "your-region" with the AWS region of your S3 bucket

export const handler: S3Handler = async (event: S3Event) => {
    try {
        const bucketName = event.Records[0].s3.bucket.name;
        const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

        // Log the message
        console.log(`Object uploaded at ${new Date()} - Bucket: ${bucketName}, Key: ${objectKey}`);

        // Optionally, you can perform other actions here, such as copying the object to another location, etc.

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
