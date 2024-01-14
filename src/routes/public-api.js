import express from "express";
import userController from "../controller/user-controller.js";
import adminController from "../controller/admin-controller.js";

export const publicRoutes = express.Router();

// root
publicRoutes.get("/", (req, res) => {
  res.send("OK");
});

// user api
publicRoutes.post("/api/users/register", userController.register);
publicRoutes.post("/api/users/login", userController.login);

// admin api
publicRoutes.post("/api/admin/register", adminController.register);
publicRoutes.post("/api/admin/login", adminController.login);
