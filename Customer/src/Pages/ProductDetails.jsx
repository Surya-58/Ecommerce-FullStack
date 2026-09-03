import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/productApi";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import "../Styles/Pages/product-details.css";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleGetProduct = async () => {
    try {
      const data = await getProductById(id);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <p>Loading product...</p>
      </div>
    );
  }

  const wishlistAdded = isInWishlist(product._id);

  return (
    <div className="container">

      <div className="pdp">

        {/* Product Image */}

        <div className="pdp-gallery">
          <div className="pdp-gallery__main">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Information */}

        <div className="pdp-info">

          <h1 className="pdp-info__title">
            {product.name}
          </h1>

          <p className="pdp-info__brand">
            {product.category}
          </p>

          <div className="pdp-price">
            <span className="text-price">
              ₹{product.price}
            </span>
          </div>

          <p>
            Category: {product.category}
          </p>

          <div className="pdp-info__row">

            <span>
              Stock: {product.stock}
            </span>

            <span>
              {product.stock > 0
                ? "✅ In Stock"
                : "❌ Out of Stock"}
            </span>

          </div>

          {/* Quantity */}

          <div className="qty-stepper">

            <button
              className="btn-icon-circle"
              onClick={() =>
                setQuantity((prev) => Math.max(1, prev - 1))
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              className="btn-icon-circle"
              onClick={() =>
                setQuantity((prev) =>
                  Math.min(product.stock, prev + 1)
                )
              }
              disabled={quantity >= product.stock}
            >
              +
            </button>

          </div>

          {/* Actions */}

          <div className="pdp-info__actions">

            <button
              className="btn btn--primary"
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock <= 0}
            >
              {product.stock <= 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>

            <button
              className="btn btn--secondary"
              onClick={() =>
                wishlistAdded
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product)
              }
            >
              {wishlistAdded
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>

          </div>

          <div className="pdp-info__delivery">
            🚚 Delivery in 30-45 minutes
          </div>

        </div>
      </div>

      {/* Product Details */}

      <div className="pdp-specs">

        <div className="pdp-specs__group">

          <h3 className="pdp-specs__title">
            Description
          </h3>

          <div className="pdp-specs__body">
            {product.description ||
              "No description available"}
          </div>

        </div>

        <div className="pdp-specs__group">

          <h3 className="pdp-specs__title">
            Product Information
          </h3>

          <div className="pdp-specs__body">

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              ₹{product.price}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;