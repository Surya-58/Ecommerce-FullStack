import express from "express";
import {
    addToCart, 
    getCart, 
    updateCart,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.get("/", authMiddleware, getCart)
cartRouter.put("/update",authMiddleware, updateCart)
cartRouter.delete("/remove",authMiddleware,removeFromCart)
cartRouter.delete("/clear",authMiddleware, clearCart)


export default cartRouter