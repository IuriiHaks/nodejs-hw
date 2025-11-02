// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(cors());
app.use(express.json());
app.use(pino());

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// GET-запит до списку нотаток "/notes"
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes", // Тимчасове повідомлення
  });
});

// GET-запит до нотатки за ідентифікатором "/notes/:noteId"
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Обробка невизначених маршрутів
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
