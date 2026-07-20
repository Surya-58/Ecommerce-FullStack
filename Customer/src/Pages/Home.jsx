import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorySection from "../Components/CategorySection";
import { getProducts } from "../Services/api";
import ProductGrid from "../Components/ProductGrid";
import "../Styles/Pages/home.css";
import WhyChooseUs from "../Components/WhyChooseUs";

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
      <section className="hero">
        <div>
          <p className="hero__eyebrow">🛒 Fresh Grocery • Daily Essentials</p>

          <h1 className="hero__title text-hero">
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
            <a href="#categories" className="btn btn--secondary">
              Browse Categories
            </a>
          </div>
        </div>

        <div className="hero__image">
          <img src="/images/hero-grocery.jpg" alt="Fresh Groceries" />
        </div>
      </section>

      <section id="categories">
        <CategorySection />
      </section>

      <section className="home-products section-spacing" >
        <div className="section-header">
          <h2 className="text-section-title">Featured Products</h2>

          <Link to="/products" className="section-header__link">
            View All →
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} />
      </section>

      <section className="deals-rail section-spacing">
        <div className="section-header">
          <h2 className="text-section-title">Today's Deals</h2>
          <Link to="/products" className="section-header__link">
            View All
          </Link>

          <div className="deals-rail__timer">Ends Tonight</div>
        </div>

        <ProductGrid
          products={products.filter((product) => product.featured)}
        />
      </section>
      <section className="best-sellers section-spacing">
        <div className="section-header">
          <h2 className="text-section-title">
            Best Sellers
          </h2>
          <Link className="section-header__link">
          View All</Link>
        </div>
        <ProductGrid products={products.slice(8,12)} />
      </section>

      <WhyChooseUs />
    </div>
  );
};

export default Home;
