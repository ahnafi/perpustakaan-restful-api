import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  name: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

const getUserValidation = Joi.string().min(3).max(100).required();

export { registerUserValidation, loginUserValidation, getUserValidation };
