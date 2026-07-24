import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../Styles/Pages/cart.css";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  console.log(cart);

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.cartQuantity;
  }, 0);

  const deliveryCharge = subtotal >= 500 ? 0 : 40;

  const savings = cart.reduce((total, item) => {
    if (!item.mrp) return total;
    return total + (item.mrp - item.price) * item.cartQuantity;
  }, 0);

  return (
    <div className="container cart-page">
      <h1 className="cart-page__title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <h2 className="cart-empty__title">Your Cart is Empty</h2>

          <p className="cart-empty__subtitle">
            Add some delicious groceries to continue shopping.
          </p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__media">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item__info">
                <h3 className="cart-item__name">{item.name}</h3>
                <p className="cart-item__weight">
                  {item.quantity} {item.unit}
                </p>
                <div className="cart-item__price-row">
                  <span className="price-current">₹{item.price}</span>
                </div>
              </div>

              <div className="cart-item__actions">
                <div className="qty-stepper">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.cartQuantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button className="cart-item__action-link">Wishlist</button>
                <button
                  className="cart-item__action-link cart-item__action-link--danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="order-summary">
        <h2 className="order-summary__title">Order Summary</h2>

        <div className="order-summary__row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="order-summary__row">
          <span>Delivery</span>
          <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
        </div>

        <div className="order-summary__row order-summary__row--savings">
          <span>Savings</span>
          <span>₹{savings}</span>
        </div>

        <div className="order-summary__divider"></div>

        <div className="order-summary__total">
          <span className="order-summary__total-label">Total</span>
          {deliveryCharge === 0 && (
            <p className="badge badge--in-stock mt-4">🎉 You qualified for FREE Delivery!</p>
          )}

          <span className="order-summary__total-value">
            ₹{subtotal + deliveryCharge}
          </span>
        </div>

        <button className="btn btn--primary">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
