import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message(`ObjectId ${value} with invalid format`);
  }
  return value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().trim().allow(''),
  }),
};

export const createNoteShema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(3).max(100).required(),
    tag: Joi.string()
      .valid(...TAGS)
      .required(),
  }),
};

export const noteIdShema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.custom(objectIdValidator).required(),
  }),
};

export const updateNoteShema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().min(3).max(100),
    tag: Joi.string().valid(...TAGS),
  }).or('title', 'content', 'tag'),
};
