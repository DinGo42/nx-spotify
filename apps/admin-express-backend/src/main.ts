import { errorMiddleware } from "@shared/api";
import { createExpressEndpoints } from "@ts-rest/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { authContract } from "./contracts";
import { adminRouter, authRouter } from "./routes";

dotenv.config();

const port = process.env.PORT || 3334;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
createExpressEndpoints(authContract, authRouter, app);
createExpressEndpoints(adminContract, adminRouter, app);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
