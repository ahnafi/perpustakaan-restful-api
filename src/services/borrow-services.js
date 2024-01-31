// - `POST /api/users/borrows` - Pengguna dapat meminjam buku dengan menyertakan detail peminjaman.
// - `GET /api/users/borrows/` - Mendapatkan daftar peminjaman buku oleh pengguna.
// - `PUT /api/users/borrows/:borrowId` - Mengembalikan buku berdasarkan ID peminjaman.

import { prisma } from "../app/database.js";
import { validate } from "../validation/validate.js";
import ResponseError from "../error/response-error.js";
import {
  borrowValidation,
  restoreValidation,
} from "../validation/borrow-validation.js";
import { getUserValidation } from "../validation/user-validation.js";

const borrow = async (username, idBook, borrowDate) => {
  const data = validate(borrowValidation, {
    username,
    idBook,
    borrowDate,
  });

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: data.idBook,
    },
  });

  if (!checkBookInDatabase) throw new ResponseError(404, "book is not found");
  if (!checkUserInDatabase) throw new ResponseError(404, "user is not found");

  return prisma.borrow.create({
    data: {
      idBook: data.idBook,
      username: data.username,
      borrowDate: data.borrowDate,
    },
    select: {
      id: true,
      idBook: true,
      borrowDate: true,
      username: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      borrows: true,
    },
  });

  if (!checkUserInDatabase) throw new ResponseError(404, "User is not found");

  return checkUserInDatabase.borrows;
};

const restore = async (username, idBook, restoreDate) => {
  const data = validate(restoreValidation, { username, idBook, restoreDate });

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: data.idBook,
    },
  });

  if (!checkBookInDatabase) throw new ResponseError(404, "book is not found");
  if (!checkUserInDatabase) throw new ResponseError(404, "user is not found");

  const checkBorrowInDatabase = await prisma.borrow.findFirst({
    where: {
      username: data.username,
      idBook: data.idBook,
    },
  });

  return prisma.borrow.update({
    where: {
      id: checkBorrowInDatabase.id,
    },
    data: {
      restoreDate: data.restoreDate,
    },
    select: {
      id: true,
      username: true,
      idBook: true,
      borrowDate: true,
      restoreDate: true,
    },
  });
};

export default {
  borrow,
  get,
  restore,
};
