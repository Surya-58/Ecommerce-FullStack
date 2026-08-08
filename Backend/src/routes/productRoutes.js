import express from "express";
import { addProduct, listProducts, singleProduct} from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/add", addProduct)
productRouter.get("/list", listProducts)
productRouter.get("/:id", listProducts)

export default productRouter