// src/server.js
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware для парсингу JSON
app.use(logger);
app.use(express.json());
app.use(cors());

// app.get('/test-error', () => {
//   throw new Error('Simulated server error');
// });

// Routes
app.use(notesRoutes);

// Обробка невизначених маршрутів
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
