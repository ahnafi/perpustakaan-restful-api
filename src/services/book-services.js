import ResponseError from "../error/response-error.js";
import { createBookValidation } from "../validation/book-validation.js";
import { validate } from "./../validation/validate.js";
import { prisma } from "./../app/database.js";

const create = async (admin, request) => {
  request = validate(createBookValidation, request);

  if (admin.role != "ADMIN") {
    throw new ResponseError(401, "unauthorized");
  }

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

export default {
  create,
};
