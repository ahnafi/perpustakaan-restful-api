// - `POST /api/users/borrows` - Pengguna dapat meminjam buku dengan menyertakan detail peminjaman.
// - `GET /api/users/borrows/` - Mendapatkan daftar peminjaman buku oleh pengguna.
// - `PUT /api/users/borrows/:borrowId` - Mengembalikan buku berdasarkan ID peminjaman.

import { prisma } from "../app/database.js";
import { validate } from "../validation/validate.js";
import ResponseError from "../error/response-error.js";
import { borrowValidation } from "../validation/borrow-validation.js";
import { getUserValidation } from "../validation/user-validation.js";

const borrow = async (username, idBook) => {
  validate(borrowValidation, { username, idBook });

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: idBook,
    },
  });

  if (!checkBookInDatabase) throw new ResponseError(404, "book is not found");
  if (!checkUserInDatabase) throw new ResponseError(404, "user is not found");

  return prisma.borrow.create({
    data: {
      idBook: idBook,
      username: username,
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

export default {
  borrow,
  get,
};
