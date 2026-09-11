import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      "items.productId",
    );

    if (!cart || cart.items.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    let subtotal = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);

      if (!product) {
        return res.json({
          success: false,
          message: `Product ${item.productId.name} not found`,
        });
      }

      if (item.quantity > product.stock) {
        return res.json({
          success: false,
          message: `Only ${product.stock} items available for ${product.name}`,
        });
      }

      subtotal += product.price * item.quantity;
    }

    const deliveryCharge = subtotal >= 500 ? 0 : 40;
    const amount = subtotal + deliveryCharge;

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("Razorpay Create Order Error:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.log("Razorpay Verification Error:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
