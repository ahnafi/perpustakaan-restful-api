import express from "express";
import { authMiddleware } from "./../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

export const privateRoutes = express.Router();

// auth middleware
privateRoutes.use(authMiddleware);

// user routes
privateRoutes.get("/api/users/current", userController.get);
privateRoutes.post("/api/users/logout", userController.logout);
privateRoutes.put("/api/users/current", userController.update);
