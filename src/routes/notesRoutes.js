import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteShema,
  updateNoteShema,
  noteIdShema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';

const router = Router();

// GET-запит до списку нотаток "/notes"
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// GET-запит до нотатки за ідентифікатором "/notes/:noteId"
router.get('/notes/:noteId', celebrate(noteIdShema), getNoteById);

// POST-запит для створення нової нотатки "/notes"
router.post('/notes', celebrate(createNoteShema), createNote);

router.delete('/notes/:noteId', celebrate(noteIdShema), deleteNote);

router.patch('/notes/:noteId', celebrate(updateNoteShema), updateNote);

export default router;
