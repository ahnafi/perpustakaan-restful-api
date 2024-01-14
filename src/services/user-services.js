import ResponseError from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
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

const logout = async (username) => {
  username = validate(getUserValidation, username);

  return prisma.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const update = async (username, request) => {
  request = validate(updateUserValidation, request);

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!checkUserInDatabase) {
    throw new ResponseError(404, "user is not found");
  }

  const user = {};

  if (request.password) {
    user.password = await bcrypt.hash(request.password, 10);
  }
  if (request.name) {
    user.name = request.name;
  }

  return prisma.user.update({
    where: {
      username: username,
    },
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

export default { register, login, logout, get, update };
