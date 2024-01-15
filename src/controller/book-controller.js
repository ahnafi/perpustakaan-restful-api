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

export default {
  create,
};
