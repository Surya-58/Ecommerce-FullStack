import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorySection from "../Components/CategorySection";
import { getProducts } from "../Services/api";
import ProductGrid from "../Components/ProductGrid";

const Home = () => {
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);
  return (
    <div className="container">
      <div className="hero">
        <div>
          <p className="hero__eyebrow">🛒 Fresh Grocery • Daily Essentials</p>

          <h1 className="hero__title" text-hero>
            Fresh groceries <span>at your doorstep</span>
          </h1>

          <p className="hero__subtitle text-body-secondary">
            Shop fresh fruits, vegetables, beverages, groceries and daily
            essentials with fast delivery and great prices.
          </p>

          <div className="hero__ctas">
            <Link to="/products" className="btn btn--primary">
              Shop Now
            </Link>
            <Link to="/products" className="btn btn--secondary">
              Browse Categories
            </Link>
          </div>
        </div>

        <div className="hero__image">
          <img src="/images/hero-grocery.jpg" alt="Fresh Groceries" />
        </div>
      </div>

      <CategorySection />
      <section>
        <h2 className="text-section-title">Featured Products</h2>

        <ProductGrid products={products.slice(0,4)} />
      </section>
    </div>
  );
};

export default Home;
