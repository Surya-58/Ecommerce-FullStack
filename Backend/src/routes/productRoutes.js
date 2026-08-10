import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  updateProduct,
  removeProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/list", listProducts);
productRouter.get("/:id", listProducts);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", removeProduct)

export default productRouter;
