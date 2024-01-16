import express from "express";
import bookController from "../controller/book-controller.js";
import adminController from "../controller/admin-controller.js";
import { adminAuthMiddleware } from "../middleware/auth-middleware.js";

export const adminRoutes = new express.Router();

// auth middleware
adminRoutes.use(adminAuthMiddleware);

// admin routes
adminRoutes.post("/api/admin/logout", adminController.logout);

// book routes
adminRoutes.post("/api/books", bookController.create);
adminRoutes.put("/api/books/:idBook", bookController.update);
adminRoutes.delete("/api/books/:idBook", bookController.remove);
