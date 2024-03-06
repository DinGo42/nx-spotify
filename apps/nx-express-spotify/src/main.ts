import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares";
import { authRouter } from "./routes";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const test = async () =>
//   await prisma.users.create({
//     data: {
//       email: "ivan.nesterenko@ukr.net",
//       password: "12345",
//       userName: "Imaizumi",
//     },
//   });

// test();

dotenv.config();

const app = express();
app.use(errorMiddleware);

app.use(cors());
app.use(cookieParser());

app.use("./auth", authRouter);
app.get("/api", (req, res) => {
  res.send({ message: "Welcome to nx-express-spotify!" });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
