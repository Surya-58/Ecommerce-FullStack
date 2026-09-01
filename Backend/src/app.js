import express from "express";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api/product", productRouter)

app.use("/api/user",userRouter)

app.use("/api/cart", cartRouter)

app.use("/api/order", orderRouter)

export default app