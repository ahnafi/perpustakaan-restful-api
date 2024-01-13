import express from "express";
import userController from "../controller/user-controller.js";

export const publicRoutes = express.Router();

// root
publicRoutes.get("/", (req, res) => {
  res.send("OK");
});

// user api
publicRoutes.post("/api/users/register", userController.register);
