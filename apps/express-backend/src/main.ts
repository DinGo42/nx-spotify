import { errorMiddleware, userApiContract } from "@shared/api";
import { createExpressEndpoints } from "@ts-rest/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";

import { router } from "./routes";

dotenv.config();

const port = process.env.PORT || 3333;

const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/*",
  }),
);
app.use(cookieParser());

createExpressEndpoints(userApiContract, router, app);

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
