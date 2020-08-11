import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './routes/index';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', indexRoutes);

app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
