import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

import routes from './image/image.controller';

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());

app.use('/api', routes);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'An exceptional error occurred' });
});

export default app;
