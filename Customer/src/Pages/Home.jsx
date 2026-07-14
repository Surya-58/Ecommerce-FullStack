import React from "react";
import { useState, useEffect } from "react";
import { getProducts } from "../Services/api";

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

  return <div>Home Page</div>;
};

export default Home;
