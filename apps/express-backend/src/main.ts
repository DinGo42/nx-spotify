import express, { json } from "express";
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
app.use(
  cors({
    origin: "http://localhost:3000/*",
    credentials: true,
  }),
);
app.use(cookieParser());
createExpressEndpoints(authContract, authRouter, app);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
