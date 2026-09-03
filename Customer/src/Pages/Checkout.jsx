import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { createOrderApi } from "../Services/orderApi";

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

    const {
      name,
      phone,
      street,
      city,
      state,
      pincode,
    } = address;

    if (
      !name ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !pincode
    ) {
      setError("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);

      const data = await createOrderApi({
        address,
        paymentMethod,
      });

      console.log("Order Created:", data);

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.log("Place Order Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Checkout</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div>
        <h2>Delivery Address</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
        />
      </div>

      <div>
        <h2>Payment Method</h2>

        <label>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Online Payment
        </label>
      </div>

      <div>
        <h2>Order Summary</h2>

        <p>Subtotal: ₹{subtotal}</p>

        <p>
          Delivery:{" "}
          {deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge}`}
        </p>

        <h3>Total: ₹{total}</h3>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

    </div>
  );
};

export default Checkout;