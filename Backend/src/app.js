import express from "express"
import productRoutes from "./routes/productRoutes.js"

const app = express()

app.get("/", (req,res) => {
    res.send("Welcome to our Ecommerce Backend Version 2")
})

app.use("/products",productRoutes)

export default app