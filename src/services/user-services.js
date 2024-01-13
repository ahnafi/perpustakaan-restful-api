import ResponseError from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import { prisma } from "./../app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUserInDatabase = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUserInDatabase) {
    throw new ResponseError(400, "username is already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: {
      name: user.name,
      password: user.password,
      username: user.username,
    },
    select: {
      name: true,
      username: true,
    },
  });
};

const login = async (request) => {
  request = validate(loginUserValidation, request);

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: request.username,
    },
    select: {
      password: true,
      username: true,
    },
  });

  if (!checkUserInDatabase) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const checkPassword = await bcrypt.compare(
    request.password,
    checkUserInDatabase.password
  );

  if (!checkPassword) {
    throw new ResponseError(401, "username or password is wrong");
  }
  const token = uuid().toString();

  return prisma.user.update({
    where: {
      username: request.username,
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
