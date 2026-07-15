import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/api";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("ID : ", id);

  const [product, setProduct] = useState(null);

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

  return (
    <div>
      <h1>ProductDetails</h1>

      {product && (
        <div>
          <img src={product.image} alt={product.name} width="200" />

          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>

          <p>Category: {product.category}</p>

          <p>Stock: {product.stock}</p>

          {product.featured  && <p>Featured Product</p>}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
