import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log("CartProvider Rendered");
  

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          cartQuantity: item.cartQuantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          if (item.cartQuantity > 1) {
            return {
              ...item,
              cartQuantity: item.cartQuantity - 1,
            };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  };

  const addToCart = (product, quantity) => {
 
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            cartQuantity: item.cartQuantity + quantity,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          cartQuantity: quantity,
        },
      ]);
    }
  };
  useEffect(()=>{
    console.log("cart updated:",cart);
  },[cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
