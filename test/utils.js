import { prisma } from "../src/app/database.js";
import bcrypt from "bcrypt";
import fs, { accessSync } from "fs";

export const deleteAllUsers = async () => {
  return prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createUser = async () => {
  return prisma.user.create({
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
  return prisma.user.create({
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
  return prisma.book.deleteMany({
    where: {
      title: "test",
    },
  });
};

export const createBook = async () => {
  const readStream = fs.createReadStream("./test/Capture.png");
  // Create a write stream to the destination file
  const writeStream = fs.createWriteStream("./public/img/img.png");
  // Pipe the read stream to the write stream
  readStream.pipe(writeStream);
  // Listen for the 'finish' event to know when the copying is complete
  writeStream.on("finish", () => {
    console.log("Image copied successfully ");
  });
  // Handle errors
  writeStream.on("error", (err) => {
    console.error("Error copying image:", err);
  });

  return prisma.book.create({
    data: {
      title: "test",
      author: "sy",
      totalQty: 10,
      category: "galaxy",
      availableQty: 10,
      description: "desc",
      image: "/public/img/img.png",
    },
  });
};

export const deleteBorrow = async (idBorrow) => {
  return prisma.borrow.delete({
    where: {
      id: idBorrow,
    },
  });
};

export const createBorrow = async (username, idBook) => {
  return prisma.borrow.create({
    data: {
      username: username,
      idBook: idBook,
      borrowDate: new Date(),
    },
    select: {
      id: true,
    },
  });
};
