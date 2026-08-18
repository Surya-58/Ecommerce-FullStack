import express from "express";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express()

app.use(express.json())

app.use("/api/product", productRouter)

app.use("/api/user",userRouter)

export default app