import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRoutes } from "../routes/public-api.js";

export const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(publicRoutes)

// error handling
app.use(errorMiddleware);
