import argon2 from "argon2";
import { tokenService } from "./token-service";

const saltRounds = 42;

const {
  deleteToken,
  generateToken,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
} = tokenService();

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
    try {
      const hashedPassword = await argon2.hash(password);
    } catch (err) {
      //...
    }

    /// add user to db email unique , hashedPassword, userName

    const tokens = generateToken({
      email,
      userName,
    });

    return { ...tokens, user: { email, userName } };
  };
  const login = async ({
    password,
    email,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const hashedPassword = "hashedPAssword"; /// user hashed password form db
      if (!(await argon2.verify(hashedPassword, password))) "error"; /// error if password didn`t matches
    } catch (error) {
      //..
    }
  };
  const logout = async (refreshToken: string) => {
    deleteToken(refreshToken);
  };

  return { logout, login, signup };
};
