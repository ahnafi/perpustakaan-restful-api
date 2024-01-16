import express from "express";
import userController from "../controller/user-controller.js";
import adminController from "../controller/admin-controller.js";
import bookController from "../controller/book-controller.js";

export const publicRoutes = express.Router();

// root
publicRoutes.get("/", (req, res) => {
  res.send(`
  <div class="tenor-gif-embed" data-postid="23838017" data-share-method="host" data-aspect-ratio="1" data-width="100%" ><a href="https://tenor.com/view/rickroll-gif-23838017">Rickroll Sticker</a>from <a href="https://tenor.com/search/rickroll-stickers">Rickroll Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
  `);
});

// user api
publicRoutes.post("/api/users/register", userController.register);
publicRoutes.post("/api/users/login", userController.login);

// admin api
publicRoutes.post("/api/admin/register", adminController.register);
publicRoutes.post("/api/admin/login", adminController.login);

// book api
publicRoutes.get("/api/public/books/:idBook", bookController.get);
publicRoutes.get("/api/public/books", bookController.search);
