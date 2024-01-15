import adminServices from "../services/admin-services.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await adminServices.register(request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await adminServices.login(request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = req.user;
    await adminServices.logout(user);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout };
