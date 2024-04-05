/* eslint-disable @typescript-eslint/naming-convention */
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const secretAccessKey = process.env.SECRET_ACCESS_BUCKET_KEY;
const bucketName = process.env.BUCKET_NAME;

const client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
});

export const addToS3 = async (params: Omit<PutObjectCommandInput, "Bucket">) => {
  const command = new PutObjectCommand({ ...params, Bucket: bucketName });
  await client.send(command);
};

export const getLinkFromS3 = async (params: Omit<GetObjectCommandInput, "Bucket">) => {
  const command = new GetObjectCommand({ ...params, Bucket: bucketName });
  await client.send(command);
  return await getSignedUrl(client, command);
};

export const deleteFromS3 = async (params: Omit<DeleteObjectCommandInput, "Bucket">) => {
  const command = new DeleteObjectCommand({ ...params, Bucket: bucketName });
  await client.send(command);
};
