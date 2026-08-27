import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/api";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import "../Styles/Pages/product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleGetProduct = async () => {
    try {
      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [id]);

  const discount = product?.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const wishlistAdded = product ? isInWishlist(product.id) : false;
  if (!product) {
    return (
      <div className="container">
        <p>Loading product...</p>
      </div>
    );
}

  return (
    <div className="container">

      {product && (
        <>
          <div className="pdp">
            <div className="pdp-gallery">
              <div className="pdp-gallery__main">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="pdp-info">
              <h1 className="pdp-info__title">{product.name}</h1>
              <p className="pdp-info__brand">{product.brand}</p>
              <div className="pdp-info__meta">
                <span className="pdp-info__rating">{product.rating}</span>
                <span>({product.reviews}Reviews)</span>
              </div>

              <div className="pdp-price">
                <span className="text-price">{product.price}</span>
                {product.mrp && (
                  <span className="text-price-mrp">{product.mrp}</span>
                )}
                {discount > 0 && (
                  <span className="text-discount">{discount}% off</span>
                )}
              </div>

              <p>Category: {product.category}</p>
              <div className="pdp-info__row">
                <span>
                  {product.quantity}
                  {product.unit}
                </span>
                <span>
                  {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
                </span>
              </div>

              {product.featured && <p>Featured Product</p>}
              <div className="qty-stepper">
                <button
                  className="btn-icon-circle"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  className="btn-icon-circle"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="pdp-info__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                  className="btn btn--secondary"
                  onClick={() =>
                    wishlistAdded
                      ? removeFromWishlist(product.id)
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
          <div className="pdp-specs">
            <div className="pdp-specs__group">
              <h3 className="pdp-specs__title">Description</h3>
              <div className="pdp-specs__body">
                {product.description || "No description available"}
              </div>
            </div>
            <div className="pdp-specs__group">
              <h3 className="pdp-specs__title">Product Information</h3>
              <div className="pdp-specs__body">
                <p>
                  <strong>Category:</strong>
                  {product.category}{" "}
                </p>
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Weight:</strong> {product.quantity} {product.unit}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
