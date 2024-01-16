import ResponseError from "../error/response-error.js";
import {
  createBookValidation,
  getBookValidation,
  updateBookValidation,
} from "../validation/book-validation.js";
import { validate } from "./../validation/validate.js";
import { prisma } from "./../app/database.js";

const create = async (admin, request) => {
  request = validate(createBookValidation, request);

  if (admin.role != "ADMIN") throw new ResponseError(401, "unauthorized");

  const checkBookInDatabase = await prisma.book.findFirst({
    where: {
      title: request.title,
    },
  });

  if (checkBookInDatabase) {
    throw new ResponseError(400, "Title is already exist");
  }

  return prisma.book.create({
    data: {
      title: request.title,
      author: request.author,
      description: request.description,
      totalQty: request.totalQty,
      availableQty: request.totalQty,
    },
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      totalQty: true,
      availableQty: true,
    },
  });
};

const update = async (admin, idBook, request) => {
  idBook = validate(getBookValidation, idBook);
  request = validate(updateBookValidation, request);

  if (admin.role != "ADMIN") throw new ResponseError(401, "unauthorized");

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: idBook,
    },
  });

  if (!checkBookInDatabase) {
    throw new ResponseError(404, "book is not found");
  }

  const book = {};

  if (request.title) book.title = request.title;
  if (request.author) book.author = request.author;
  if (request.description) book.description = request.description;
  if (request.totalQty) book.totalQty = request.totalQty;
  if (request.availableQty) book.availableQty = request.availableQty;

  return prisma.book.update({
    where: {
      id: idBook,
    },
    data: book,
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      totalQty: true,
      availableQty: true,
    },
  });
};

const remove = async (admin, idBook) => {
  idBook = validate(getBookValidation, idBook);

  if (admin.role != "ADMIN") throw new ResponseError(401, "unauthorized");

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: idBook,
    },
  });

  if (!checkBookInDatabase) {
    throw new ResponseError(404, "book is not found");
  }

  return prisma.book.delete({
    where: {
      id: idBook,
    },
  });
};

export default {
  create,
  update,
  remove,
};
