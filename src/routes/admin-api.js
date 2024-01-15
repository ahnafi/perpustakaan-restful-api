import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import adminController from "../controller/admin-controller.js";

export const adminRoutes = new express.Router();

// auth middleware
adminRoutes.use(authMiddleware);

// admin routes
adminRoutes.post("/api/admin/logout", adminController.logout);
