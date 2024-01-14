import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

export const userRoutes = express.Router();

// auth middleware
userRoutes.use(authMiddleware);

// user routes
userRoutes.get("/api/users/current", userController.get);
userRoutes.post("/api/users/logout", userController.logout);
userRoutes.put("/api/users/current", userController.update);
