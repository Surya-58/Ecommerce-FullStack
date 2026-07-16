import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/api";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  
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

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            cartQuantity: item.cartQuantity + 1,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart,{...product,cartQuantity : 1}])
    }
  };

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

          {product.featured && <p>Featured Product</p>}

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
