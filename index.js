// index.js
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import authRoutes from './api/routes/auth.js';
import incomeRoutes from './api/routes/income.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);

export const handler = serverless(app);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
