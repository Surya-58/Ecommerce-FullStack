import express from "express";

import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import adminAuth from "../middleware/adminAuth.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", adminAuth, addCategory);

categoryRouter.get("/list", adminAuth, getCategories);

categoryRouter.put("/:id", adminAuth, updateCategory);

categoryRouter.delete("/:id", adminAuth, deleteCategory);

export default categoryRouter;