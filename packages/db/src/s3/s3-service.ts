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

import { createCryptoKey } from "./utils";

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
export const addToS3 = async ({
  file,
  key,
  ...params
}: { file: File; key?: string } & Omit<PutObjectCommandInput, "Body" | "Bucket" | "Key">) => {
  const avatarBuffer = Buffer.from(await file.arrayBuffer());
  const s3key = key ?? createCryptoKey();
  const command = new PutObjectCommand({
    Body: avatarBuffer,
    ContentType: file.type,
    Key: s3key,
    ...params,
    Bucket: bucketName,
  });
  await client.send(command);
  return s3key;
};

export const getLinkFromS3 = async ({
  key,
  ...params
}: { key: string } & Omit<GetObjectCommandInput, "Bucket" | "Key">) => {
  const command = new GetObjectCommand({ Key: key, ...params, Bucket: bucketName });
  await client.send(command);
  return await getSignedUrl(client, command);
};

export const deleteFromS3 = async ({
  key,
  ...params
}: { key: string } & Omit<DeleteObjectCommandInput, "Bucket" | "Key">) => {
  const command = new DeleteObjectCommand({ Key: key, ...params, Bucket: bucketName });
  await client.send(command);
};
