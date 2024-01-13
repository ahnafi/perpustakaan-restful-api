import userServices from "../services/user-services.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userServices.register(request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
