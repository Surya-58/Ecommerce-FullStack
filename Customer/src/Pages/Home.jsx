import React from "react";
import { useState, useEffect } from "react";
import { getProducts } from "../Services/api";
import FeaturedProducts from "../Components/FeaturedProducts";

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

  console.log(products);

  return <div>
    <h1>Home Page</h1>
    <FeaturedProducts products={products} />
  </div>;
};

export default Home;
