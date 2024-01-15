import { prisma } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const deleteAllUsers = async () => {
  return prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createUser = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      name: "test",
      password: await bcrypt.hash("password", 10),
      token: "test",
      role: "USER",
    },
  });
};

export const createAdmin = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      name: "test",
      password: await bcrypt.hash("password", 10),
      token: "test",
      role: "ADMIN",
    },
  });
};

export const deleteAllBook = async () => {
  await prisma.book.deleteMany({
    where: {
      title: "test",
    },
  });
};

export const createBook = async () => {
  await prisma.book.create({
    data: {
      title: "test",
      author: "sy",
      totalQty: 10,
      availableQty: 10,
      description: "desc",
    },
  });
};
