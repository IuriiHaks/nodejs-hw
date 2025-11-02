// src/server.js
import express from 'express';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());

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

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
