import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares';
import { authRouter } from './routes';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
