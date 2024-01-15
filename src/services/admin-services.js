import bcrypt from "bcrypt";
import { prisma } from "../app/database.js";
import { validate } from "../validation/validate.js";
import ResponseError from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
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
      role: "ADMIN",
    },
    select: {
      name: true,
      username: true,
      role: true,
    },
  });
};

const login = async (request) => {
  request = validate(loginUserValidation, request);

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: request.username,
      role: "ADMIN",
    },
    select: {
      password: true,
      username: true,
      role: true,
    },
  });

  if (!checkUserInDatabase) {
    throw new ResponseError(401, "username or password is wrong");
  }

  if (checkUserInDatabase.role != "ADMIN") {
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
      role: "ADMIN",
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
};

const logout = async (user) => {
  user.username = validate(getUserValidation, user.username);

  if (user.role != "ADMIN") {
    throw new ResponseError(401, "unauthorized");
  }
  return prisma.user.update({
    where: {
      username: user.username,
      role: "ADMIN",
    },
    data: {
      token: null,
    },
  });
};

export default {
  register,
  login,
  logout,
};
