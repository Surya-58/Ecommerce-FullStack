import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../Styles/cart.css";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.cartQuantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__media">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item__info">
                <h3>{item.name}</h3>
                <p>
                  {item.quantity} {item.unit}
                </p>
                <p>₹ {item.price}</p>
              </div>

              <div className="cart-item__actions">
                <div className="cart-item__qty-row">
                  <button>-</button>
                  <span>{item.cartQuantity}</span>
                  <button>+</button>
                </div>

                <div className="cart-item__links">
                  <button>Wishlist</button>
                  <button className="link--danger">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="order-summary ">
        <h2 className="order-summary__title">Order Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row summary-row--total">
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
