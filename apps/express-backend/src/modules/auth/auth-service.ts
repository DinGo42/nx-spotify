import { ForbiddenError, NotFoundError, UnauthorizedError } from "@shared/utils";
import argon2 from "argon2";
import { generateToken } from "../../main";
import { prisma } from "../../prisma";

export const signupService = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const emailCheck = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });

  if (emailCheck) throw new ForbiddenError(`User with email:${email} already exist`);

  const hashedPassword = await argon2.hash(password);

  const { id } = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nickname: nickname,
    },
    select: {
      id: true,
    },
  });

  const tokens = generateToken(id);

  return tokens;
};
export const loginService = async ({ password, email }: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError(`User with email:${email} not found`);

  const { password: hashedPassword, id } = user;

  if (!(await argon2.verify(hashedPassword, password))) throw new UnauthorizedError(`Password doesn't match`);

  const tokens = generateToken(id);

  return tokens;
};
