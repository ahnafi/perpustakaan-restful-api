import { prisma } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const deleteAllUsers = async () => {
  return prisma.user.deleteMany({
    where: {
      name: "test",
    },
  });
};

export const createUser = async () => {
  return prisma.user.create({
    data: {
      username: "test",
      name: "test",
      password: await bcrypt.hash("password", 10),
    },
  });
};
