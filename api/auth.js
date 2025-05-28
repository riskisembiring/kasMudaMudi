const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoutes = require('../routes/auth');
const incomeRoutes = require('../routes/income');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);

module.exports.handler = serverless(app);
