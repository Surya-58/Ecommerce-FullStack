import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  return (
    <div className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} />
        {product.featured && (
          <div className="product-card__badges">
            <span className="text-discount">Featured</span>
          </div>
        )}
        <div className="product-card__wishlist">
          <button className="btn-icon-circle">❤️</button>
        </div>
        <div className="product-card__quick-add">
          <button
            className="btn btn--primary btn--full"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <p className="text-brand">{product.brand}</p>
        <h3 className="text-product-name">{product.name}</h3>

        <div className="product-card__meta">

        <span className="text-rating">{product.rating}</span>
        <span>({product.reviews})</span>
        </div>

        <p className="text-caption">
          {product.quantity} {product.unit}
        </p>
        <div className="product-card__price-row">
        <span className="text-price">₹{product.price}</span>


        {product.mrp && (<span className="text-price-mrp">₹{product.mrp}</span>)}
        {discount > 0 && (
          <p className="text-discount">{discount}%OFF</p>
        )}
      </div>
      <div className="product-card__footer">
        <Link to={`/products/${product.id}`}>
          <button className="btn btn--primary btn--full">View Product</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
