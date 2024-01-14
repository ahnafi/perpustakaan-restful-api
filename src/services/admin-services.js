import bcrypt from "bcrypt";
import { prisma } from "../app/database.js";
import { validate } from "../validation/validate.js";
import ResponseError from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";

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

export default {
  register,
};