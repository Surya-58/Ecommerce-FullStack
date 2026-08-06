import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        res.json({
            success: true,
            message: "Product Controller Working",
        })
        
    } catch (error) {
        console.log(error);

        res.json({
            success:false,
            message: error.message,
        })
        
    }
}