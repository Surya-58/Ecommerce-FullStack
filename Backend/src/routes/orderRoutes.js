import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router()

orderRouter.post("/create",authMiddleware, createOrder)

export default orderRouter