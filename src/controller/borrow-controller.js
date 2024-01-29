import borrowServices from "../services/borrow-services";

const add = async (req, res, next) => {
  try {
    const idBook = req.body.idBook;
    const username = req.body.username;
    const borrow = await borrowServices.borrowBook(username, idBook);
    res.status(200).json({
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export default { add };
