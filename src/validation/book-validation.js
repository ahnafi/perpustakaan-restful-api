import Joi from "joi";

const createBookValidation = Joi.object({
  title: Joi.string().max(100).required(),
  author: Joi.string().max(100).required(),
  description: Joi.string().max(250).optional(),
  totalQty: Joi.number().positive().optional(),
});

const getBookValidation = Joi.number().min(0).positive().integer().required();

const updateBookValidation = Joi.object({
  title: Joi.string().max(100).optional(),
  author: Joi.string().max(100).optional(),
  description: Joi.string().max(250).optional(),
  totalQty: Joi.number().positive().optional(),
  availableQty: Joi.number().positive().optional(),
});

export { createBookValidation, getBookValidation, updateBookValidation };
