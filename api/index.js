import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import authRoutes from '../routes/auth.js';
import incomeRoutes from '../routes/income.js';

const app = express();
app.use(cors());
app.use(express.json());

// HILANGKAN prefix '/api' karena sudah otomatis oleh folder /api di Vercel
app.use('/auth', authRoutes);
app.use('/income', incomeRoutes);

export const handler = serverless(app);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}
