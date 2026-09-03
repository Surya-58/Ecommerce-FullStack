import React, {
  useState,
  createContext,
  useEffect,
} from "react";

import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../Services/cartApi";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
  });

  const [loading, setLoading] = useState(false);

  // Get cart from backend
  const getCart = async () => {
    try {
      setLoading(true);

      const data = await getCartApi();

      setCart(data.cart);

    } catch (error) {
      console.log("Get Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add product
  const addToCart = async (product, quantity = 1) => {
    try {
      const data = await addToCartApi(
        product._id,
        quantity
      );

      console.log("Add To Cart:", data);

      await getCart();

    } catch (error) {
      console.log("Add To Cart Error:", error);
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId, currentQuantity) => {
    try {
      const data = await updateCartApi(
        productId,
        currentQuantity + 1
      );

      console.log("Increase Quantity:", data);

      await getCart();

    } catch (error) {
      console.log("Increase Quantity Error:", error);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId, currentQuantity) => {
  try {
    if (currentQuantity <= 1) {
      await removeFromCartApi(productId);
      await getCart();
      return;
    }

    const data = await updateCartApi(
      productId,
      currentQuantity - 1
    );

    console.log("Decrease Quantity:", data);

    await getCart();

  } catch (error) {
    console.log("Decrease Quantity Error:", error);
  }
};

  // Remove product
  const removeFromCart = async (productId) => {
    try {
      const data = await removeFromCartApi(productId);

      console.log("Remove From Cart:", data);

      await getCart();

    } catch (error) {
      console.log("Remove From Cart Error:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const data = await clearCartApi();

      console.log("Clear Cart:", data);

      await getCart();

    } catch (error) {
      console.log("Clear Cart Error:", error);
    }
  };

  // Load cart when user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,

        getCart,

        addToCart,
        increaseQuantity,
        decreaseQuantity,

        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;