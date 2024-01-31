import borrowServices from "../services/borrow-services.js";

const add = async (req, res, next) => {
  try {
    const username = req.user.username;
    const idBook = req.body.idBook;
    const borrowDate = req.body.borrowDate;
    const result = await borrowServices.borrow(username, idBook, borrowDate);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await borrowServices.get(username);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const restore = async (req, res, next) => {
  try {
    const username = req.user.username;
    const idBook = req.body.idBook;
    const restoreDate = req.body.restoreDate;
    const result = await borrowServices.restore(username, idBook, restoreDate);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { add, get, restore };
