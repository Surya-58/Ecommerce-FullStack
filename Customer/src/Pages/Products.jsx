import React, { useState, useEffect } from "react";
import { getProducts } from "../Services/api";
import ProductGrid from "../Components/ProductGrid";

const Products = () => {
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
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default Products;
