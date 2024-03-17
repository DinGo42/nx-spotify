import argon2 from "argon2";
import { PrismaClient } from "@bd";
import { ForbiddenError, NotFoundError, UnauthorizedError, tokenService } from "@shared";

const prisma = new PrismaClient();

const { generateToken } = tokenService();

export const authService = () => {
  const signup = async ({ email, password, userName }: { email: string; password: string; userName: string }) => {
    const emailCheck = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
      },
    });

    if (emailCheck) throw new ForbiddenError(`User with email:${email} already exist`);

    const tokens = generateToken({
      email,
      userName,
    });

    const hashedPassword = await argon2.hash(password);

    await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        userName: userName,
      },
    });

    return { ...tokens, user: { email, userName } };
  };
  const login = async ({ password, email }: { email: string; password: string }) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundError(`User with email:${email} not found`);

    const { password: hashedPassword, ...userDto } = user;

    if (!(await argon2.verify(hashedPassword, password))) throw new UnauthorizedError(`Password doesn't match`);

    const tokens = generateToken({
      ...userDto,
    });

    return {
      ...tokens,
      ...userDto,
    };
  };

  return { login, signup };
};
