import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import { tokenService } from "./token-service";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../exceptions";

const prisma = new PrismaClient();

const { generateToken } = tokenService();

export const userService = () => {
  const signup = async ({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) => {
    const emailCheck = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });

    if (emailCheck) throw ForbiddenError();

    const tokens = generateToken({
      email,
      userName,
    });

    const hashedPassword = await argon2.hash(password);

    const data = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        userName: userName,
      },
    });

    if (!data) throw ValidationError();

    return { ...tokens, user: { email, userName } };
  };
  const login = async ({
    password,
    email,
  }: {
    email: string;
    password: string;
  }) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw NotFoundError();

    const { password: hashedPassword, ...userDto } = user;

    if (!(await argon2.verify(hashedPassword, password)))
      throw UnauthorizedError();

    const tokens = generateToken({
      ...userDto,
    });

    return { ...tokens, user: userDto };
  };

  return { login, signup };
};
