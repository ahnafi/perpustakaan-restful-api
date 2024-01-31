import Joi from "joi";
// import format from "@joi/date"

const borrowValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  idBook: Joi.number().positive().min(1).required(),
  borrowDate: Joi.date().iso().required(),
});

const restoreValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  idBook: Joi.number().positive().min(1).required(),
  restoreDate: Joi.date().iso().required(),
});

export { borrowValidation, restoreValidation };
