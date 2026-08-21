import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.userId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity,
          },
        ],
      });
      return res.json({
        success: true,
        message: "Product added to Cart",
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
      });
    }
    await cart.save();

    res.json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
