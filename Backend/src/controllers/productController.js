import { response } from "express";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        
        res.json({
            success: true,
            message: "Product Adding Successfully",
            product,
        })
        
    } catch (error) {
        console.log(error);

        res.json({
            success:false,
            message: error.message,
        })
        
    }
}

export const listProducts = async(req,res) => {
    try {
        const products = await Product.find()
        res.json({
            success: true,
            products,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })   
    }
}

export const singleProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.json({
            success: true,
            product,
        })

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        })
        
    }
}

export const updateProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        )
        
        res.json({
            success: true,
            message: "Product Updated Successfully",
            product
        })
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        })
        
    }
}

export const removeProduct = async(req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: "Product Deleted Successfully",
            product
        })
        
    } catch (error) {
        console.log(error);
        
        res.json({
            success:false,
            message:error.message
        })
        
    }
}