import express from "express"
import { authMiddleware } from './../middleware/auth-middleware';

export const privateRoutes = express.Router()

// auth middleware
privateRoutes.use(authMiddleware)

// user routes
