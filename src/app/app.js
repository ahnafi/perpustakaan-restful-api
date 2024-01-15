import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRoutes } from "../routes/public-api.js";
import { userRoutes } from "../routes/user-api.js";
import { adminRoutes } from "../routes/admin-api.js";

export const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(publicRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// error handling
app.use(errorMiddleware);
