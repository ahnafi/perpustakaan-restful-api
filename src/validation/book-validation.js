import Joi from "joi";

const createBookValidation = Joi.object({
  title: Joi.string().max(100).required(),
  author: Joi.string().max(100).required(),
  description: Joi.string().max(250).optional(),
  totalQty: Joi.number().positive().optional(),
});

export { createBookValidation };
