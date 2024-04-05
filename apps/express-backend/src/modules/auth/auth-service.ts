import { ForbiddenError, NotFoundError, UnauthorizedError } from "@shared/utils";
import argon2 from "argon2";

import { prisma } from "../prisma";
import { generateToken } from "../token";

export const signupService = async ({
  email,
  nickname,
  password,
}: {
  email: string;
  nickname: string;
  password: string;
}) => {
  const emailCheck = await prisma.user.findUnique({
    select: {
      password: true,
    },
    where: {
      email,
    },
  });

  if (emailCheck) throw new ForbiddenError(`User with email:${email} already exist`);

  const hashedPassword = await argon2.hash(password);

  const { id } = await prisma.user.create({
    data: {
      email,
      nickname: nickname,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const tokens = generateToken(id);

  return tokens;
};
export const loginService = async ({ email, password }: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError(`User with email:${email} not found`);

  const { id, password: hashedPassword } = user;

  if (!(await argon2.verify(hashedPassword, password))) throw new UnauthorizedError(`Password doesn't match`);

  const tokens = generateToken(id);

  return tokens;
};
