import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId: req.userId }).populate(
      "items.productId",
    );

    if (!cart || cart.items.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    let amount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);

      if (!product) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }

      amount += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });
    }

    const order = await Order.create({
      userId: req.userId,
      items: orderItems,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      orderStatus: "Order Placed",
    });

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
