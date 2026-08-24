import express from "express";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express()

app.use(express.json())

app.use("/api/product", productRouter)

app.use("/api/user",userRouter)

app.use("/api/cart", cartRouter)

app.use("/api/order", orderRouter)

export default app