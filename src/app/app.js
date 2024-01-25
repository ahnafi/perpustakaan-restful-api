import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRoutes } from "../routes/public-api.js";
import { userRoutes } from "../routes/user-api.js";
import { adminRoutes } from "../routes/admin-api.js";
import fileUpload from "express-fileupload"

export const app = express();

// middleware
app.use(express.json());
app.use("/public",express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// routes
app.use(publicRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// error handling
app.use(errorMiddleware);

// app.post("/",(req,res)=>{
//     const file = req.files.name

//     // file.mv("public", "public")
// })