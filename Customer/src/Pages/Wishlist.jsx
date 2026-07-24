import React from "react";
import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import "../Styles/Pages/wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };
  return (
    <div className="container">
      <h1 className="text-section-title">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h2 className="wishlist-empty__title">Your Wishlist is Empty</h2>

          <p className="wishlist-empty__subtitle">
            Save your favourite products here and buy them later.
          </p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="product-card wishlist-card">
              <div className="product-card__media">
                <img src={item.image} alt={item.name} />
              </div>
              <button
                className="wishlist-card__remove"
                onClick={() => removeFromWishlist(item.id)}
              >
                ✕
              </button>
              <div className="product-card__body">
                <h3 className="text-product-name">{item.name}</h3>

                <div className="product-card__price-row">
                  <span className="text-price">₹{item.price}</span>
                </div>

                <p className="wishlist-card__stock">
                  {item.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
                </p>
              </div>
              <div className="wishlist-card__footer">
                <button
                  className="btn btn--primary"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
