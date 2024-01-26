import ResponseError from "../error/response-error.js";
import {
  createBookValidation,
  getBookValidation,
  searchBookValidation,
  updateBookValidation,
} from "../validation/book-validation.js";
import { validate } from "./../validation/validate.js";
import { prisma } from "./../app/database.js";
import { v4 as uuid } from "uuid";
import fs from "fs";

const saveImage = async (files) => {
  let filesName = files.name;
  let ext = filesName.split(".");
  ext = ext.pop();

  // file type checker
  const imageFileTypes = ["jpg", "jpeg", "png", "svg", "webp", "heic"];
  const checkImgTypes = imageFileTypes.includes(ext.toLowerCase());
  if (!checkImgTypes) throw new ResponseError(503, "Error cant save image");

  let imageName = uuid() + "." + ext;

  await files.mv("./public/img/" + imageName, (err) => {
    if (err) throw new ResponseError(503, "Error cant save image");
  });

  return imageName;
};

const removeImage = async (imagePath) => {
 await fs.promises.rm("." + imagePath);
  // if (!remove) throw new ResponseError(503, "Error cant save image");
};

const create = async (admin, request, fileImage = null) => {
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

  if (fileImage) {
    let name = await saveImage(fileImage);
    request.image = "/public/img/" + name;
  }

  return prisma.book.create({
    data: {
      title: request.title,
      author: request.author,
      category: request.category,
      description: request.description,
      image: request.image,
      totalQty: request.totalQty,
      availableQty: request.totalQty,
    },
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      description: true,
      image: true,
      totalQty: true,
      availableQty: true,
    },
  });
};

const update = async (admin, idBook, request, fileImage = null) => {
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

  if (fileImage) {
    let name = await saveImage(fileImage);
    book.image = "/public/img/" + name;
    if (checkBookInDatabase.image != null)
      await removeImage(checkBookInDatabase.image);
  }
  if (request.title) book.title = request.title;
  if (request.author) book.author = request.author;
  if (request.category) book.category = request.category;
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
      category: true,
      description: true,
      totalQty: true,
      availableQty: true,
      image: true,
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

const get = async (idBook) => {
  idBook = validate(getBookValidation, idBook);

  const checkBookInDatabase = await prisma.book.findUnique({
    where: {
      id: idBook,
    },
  });

  if (!checkBookInDatabase) {
    throw new ResponseError(404, "book is not found");
  }

  return checkBookInDatabase;
};

const search = async (request) => {
  // title? ,author? ,  totalqty , availableqty , page
  request = validate(searchBookValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.title) filters.push({ title: { contains: request.title } });
  if (request.author) filters.push({ author: { contains: request.author } });
  if (request.category)
    filters.push({ category: { contains: request.category } });
  if (request.totalQty)
    filters.push({ totalQty: { contains: request.totalQty } });
  if (request.availableQty)
    filters.push({ availableQty: { contains: request.availableQty } });

  const books = await prisma.book.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const count = await prisma.book.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: books,
    paging: {
      page: request.page,
      total_item: count,
      total_page: Math.ceil(count / request.size),
    },
  };
};

export default {
  create,
  update,
  remove,
  search,
  get,
};
