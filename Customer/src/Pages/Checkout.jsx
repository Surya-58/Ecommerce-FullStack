import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import {
  createOrderApi,
  createRazorpayOrderApi,
  verifyRazorpayPaymentApi,
} from "../Services/orderApi";
import "../Styles/Pages/checkout.css";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const items = cart?.items || [];

  const subtotal = items.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setError("");

    const { name, phone, street, city, state, pincode } = address;

    if (!name || !phone || !street || !city || !state || !pincode) {
      setError("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);

      // COD
      if (paymentMethod === "COD") {
        const data = await createOrderApi({
          address,
          paymentMethod: "COD",
        });

        console.log("Order Created:", data);

        alert("Order placed successfully!");
        navigate("/orders");
        return;
      }

      // ONLINE PAYMENT
      const paymentData = await createRazorpayOrderApi(total);

      const options = {
        key: paymentData.key,
        amount: paymentData.order.amount,
        currency: paymentData.order.currency,
        name: "ECommerce Store",
        description: "Order Payment",
        order_id: paymentData.order.id,

        handler: async function (response) {
          try {
            const verificationData = await verifyRazorpayPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Payment Verified:", verificationData);

            const data = await createOrderApi({
              address,
              paymentMethod: "ONLINE",
            });

            console.log("Order Created:", data);

            alert("Payment successful and order placed!");
            navigate("/orders");
          } catch (error) {
            console.log("Payment Verification Error:", error);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);

        setError(
          response.error.description || "Payment failed. Please try again.",
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.log("Place Order Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate("/products")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <main className="container checkout-page">
      <div className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
        <p className="checkout-page__subtitle">
          Complete your order by providing your delivery details.
        </p>
      </div>

      {error && <p className="checkout-error">{error}</p>}

      <div className="checkout-layout">
        <section className="checkout-card">
          <h2 className="checkout-card__title">Delivery Address</h2>

          <div className="checkout-form">
            <div className="checkout-form__row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={address.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={address.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                id="street"
                type="text"
                name="street"
                placeholder="Enter your street address"
                value={address.street}
                onChange={handleChange}
              />
            </div>

            <div className="checkout-form__row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="Enter your pincode"
                value={address.pincode}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <aside className="checkout-sidebar">
          <section className="checkout-card">
            <h2 className="checkout-card__title">Payment Method</h2>

            <div className="payment-options">
              <label
                className={`payment-option ${
                  paymentMethod === "COD" ? "payment-option--active" : ""
                }`}
              >
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives</small>
                </span>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === "ONLINE" ? "payment-option--active" : ""
                }`}
              >
                <input
                  type="radio"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>
                  <strong>Online Payment</strong>
                  <small>Pay securely using Razorpay</small>
                </span>
              </label>
            </div>
          </section>

          <section className="checkout-card order-summary">
            <h2 className="order-summary__title">Order Summary</h2>

            <div className="order-summary__row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="order-summary__row">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="order-summary__divider" />

            <div className="order-summary__total">
              <span className="order-summary__total-label">Total</span>
              <span className="order-summary__total-value">₹{total}</span>
            </div>

            <button
              className="btn btn--primary checkout-submit"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
