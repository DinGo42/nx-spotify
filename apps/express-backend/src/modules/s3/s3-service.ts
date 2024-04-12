export { deleteFromS3 as deleteFromS3Service, getLinkFromS3 as getLinkFromS3Service } from "@db/s3";

import { addToS3 } from "@db/s3";

import { getSelfService } from "../user";

export const addToS3Service = async ({ file, userId }: { file: File; userId: string }) => {
  const { avatar } = await getSelfService({
    select: {
      avatar: true,
    },
    where: {
      id: userId,
    },
  });
  return await addToS3({ file, key: avatar ?? undefined });
};
