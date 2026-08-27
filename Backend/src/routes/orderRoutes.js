import express from 'express';
import { 
    createOrder, 
    getMyOrder, 
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router()

orderRouter.post("/create",authMiddleware, createOrder)
orderRouter.get("/my-orders",authMiddleware, getMyOrder)
orderRouter.get("/all",authMiddleware,getAllOrders)
orderRouter.get("/:orderId",authMiddleware,getOrderById)
orderRouter.put("/:orderId/cancel",authMiddleware,cancelOrder)
orderRouter.put("/:orderId/status",authMiddleware,updateOrderStatus)

export default orderRouter