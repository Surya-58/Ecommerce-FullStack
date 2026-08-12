import { response } from "express";
import Product from "../models/productModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: imageUrl,
      imagePublicId: imagePublicId,
    });

    res.json({
      success: true,
      message: "Product Adding Successfully",
      product,
    });
  } catch (error) {
    if (imagePublicId) {
      await deleteFromCloudinary(imagePublicId);
    }
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "";

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    let sortOption = {};

    if (sort === "priceLow") {
      sortOption.price = 1;
    }

    if(sort === "priceHigh"){
        sortOption.price = -1
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product Not Found",
      });
    }

    let imageUrl = product.image;
    let imagePublicId = product.imagePublicId;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      if (product.imagePublicId) {
        await deleteFromCloudinary(product.imagePublicId);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: imageUrl,
        imagePubliicId: imagePublicId,
      },
      { new: true, runValidators: true },
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
