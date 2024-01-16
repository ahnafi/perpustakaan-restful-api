import bookServices from "../services/book-services";

const create = async (req, res, next) => {
  try {
    const admin = req.user;
    const request = req.body;
    const result = await bookServices.create(admin, request);

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
    const result = await bookServices.update(admin, idBook, request);
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

export default {
  create,
  update,
  remove,
};
