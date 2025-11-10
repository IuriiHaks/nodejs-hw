import { Router } from "express";
import { getAllNotes, getNoteById, createNote, deleteNote, updateNote } from "../controllers/notesController.js";

const router = Router();

// GET-запит до списку нотаток "/notes"
router.get('/notes', getAllNotes);

// GET-запит до нотатки за ідентифікатором "/notes/:noteId"
router.get('/notes/:noteId', getNoteById);

// POST-запит для створення нової нотатки "/notes"
router.post('/notes', createNote);

router.delete('/notes/:noteId', deleteNote);

router.patch('/notes/:noteId', updateNote);

export default router;
