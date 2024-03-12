import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes";
import { createExpressEndpoints } from "@ts-rest/express";
import { authContract, errorMiddleware } from "@shared";

dotenv.config();

const port = process.env.PORT || 3333;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
createExpressEndpoints(authContract, authRouter, app);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
