import argon2 from "argon2";
import { PrismaClient } from "@bd";
import { NotFoundError, UnauthorizedError, tokenService } from "@shared";

const prisma = new PrismaClient();

const { generateToken } = tokenService();

export const authService = () => {
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
        role: "ADMIN",
      },
    });

    if (!user) throw new NotFoundError(`User with email:${email} not found`);

    const { password: hashedPassword, ...userDto } = user;

    if (!(await argon2.verify(hashedPassword, password)))
      throw new UnauthorizedError(`Password doesn't match`);

    const tokens = generateToken({
      ...userDto,
    });

    return { ...tokens, user: userDto };
  };

  return { login };
};
