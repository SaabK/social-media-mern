import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import connectToMongo from './db/db';
import postRouter from './routes/posts';

dotenv.config()

const app: Application = express()
const port = process.env.PORT;

connectToMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/posts', postRouter);

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}`));