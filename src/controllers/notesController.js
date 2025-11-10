import { Note } from '../models/note.js';
import  createHttpError  from 'http-errors';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find(); // Отримання всіх нотаток з бази даних
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId); // Отримання нотатки за ID з бази даних
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json( note );
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json({ note});
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({_id:noteId,});
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json({note});
};

export const updateNote = async (req, res) => {
  const {noteId} = req.params;
  const note = await Note.findOneAndUpdate(
    {_id: noteId,},
    req.body,
    {new: true,}
  );
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json({note});
};
