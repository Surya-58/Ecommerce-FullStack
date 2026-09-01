import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const wishlistAdded = isInWishlist(product._id);

  return (
    <div className="product-card">
      <div className="product-card__media">

        <img src={product.image} alt={product.name} />

        <div className="product-card__wishlist">
          <button
            className="btn-icon-circle"
            onClick={() =>
              wishlistAdded
                ? removeFromWishlist(product._id)
                : addToWishlist(product)
            }
          >
            {wishlistAdded ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="product-card__quick-add">
          <button
            className="btn btn--primary btn--full"
            onClick={() => addToCart(product, 1)}
          >
            Add to cart
          </button>
        </div>

      </div>

      <div className="product-card__body">

        <p className="text-brand">{product.category}</p>

        <h3 className="text-product-name">
          {product.name}
        </h3>

        <p className="text-caption">
          {product.description}
        </p>

        <div className="product-card__price-row">
          <span className="text-price">
            ₹{product.price}
          </span>
        </div>

        <div className="product-card__footer">
          <Link to={`/products/${product._id}`}>
            <button className="btn btn--primary btn--full">
              View Product
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;