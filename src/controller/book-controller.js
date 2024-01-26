import bookServices from "../services/book-services.js";

const create = async (req, res, next) => {
  try {
    const admin = req.user;
    const request = req.body;

    let result = await bookServices.create(admin, request, req.files?.image);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const admin = req.user;
    const idBook = req.params.idBook;
    const request = req.body;
    const result = await bookServices.update(admin, idBook, request,req.files?.image);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const admin = req.user;
    const idBook = req.params.idBook;
    await bookServices.remove(admin, idBook);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const idBook = req.params.idBook;
    const result = await bookServices.get(idBook);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      page: req.query.page,
      size: req.query.size,
      title: req.query.title,
      author: req.query.author,
      totalQty: req.query.totalqty,
      availableQty: req.query.availableQty,
    };
    const result = await bookServices.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  update,
  remove,
  get,
  search,
};
