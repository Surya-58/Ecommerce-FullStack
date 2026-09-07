import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";

import authMiddleware from "../middleware/auth.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", authMiddleware, addToWishlist);

wishlistRouter.get("/", authMiddleware, getWishlist);

wishlistRouter.delete("/remove", authMiddleware, removeFromWishlist);

wishlistRouter.delete("/clear", authMiddleware, clearWishlist);

export default wishlistRouter;