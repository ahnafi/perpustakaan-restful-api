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

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userServices.login(request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const request = req.user.username;//from auth
    await userServices.logout(request);

    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const username = req.user.username; //from auth
    const result = await userServices.get(username);

    res.status(200).json({ data: result });
  } catch (error) {
    next();
  }
};

export default {
  register,
  login,
  logout,
  get,
};
