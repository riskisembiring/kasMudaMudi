import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import authRoutes from '../routes/auth.js';
import incomeRoutes from '../routes/income.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);

export const handler = serverless(app);
