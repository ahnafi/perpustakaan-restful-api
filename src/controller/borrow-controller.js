import borrowServices from "../services/borrow-services.js";

const add = async (req, res, next) => {
  try {
    const idBook = req.body.idBook;
    const username = req.user.username;
    const result = await borrowServices.borrow(username, idBook);
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

export default { add,get };
