import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/api";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import "../Styles/Pages/product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleGetProduct = async () => {
    try {
      console.log("fetching data");

      const data = await getProductById(id);
      console.log("fetched:", data);

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  const discount = product?.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="container">
      <h1>ProductDetails</h1>

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
                  <span className="text-price-mrp">
                    {product.mrp}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-discount">
                    {discount}% off
                  </span>
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
                className="btn btn-primary"
                onClick={() => addToCart(product, quantity)}
                >
                Add to Cart</button>
                <button 
                className="btn btn--secondary"
                onClick={() => addToWishlist(product)}>
                  Add to wishlist
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
