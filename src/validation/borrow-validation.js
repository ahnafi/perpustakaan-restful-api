import Joi from "joi";

const borrowValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  idBook: Joi.number().positive().min(1).required(),
});

export {
    borrowValidation
}