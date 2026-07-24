import React from "react";
import { createContext, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);

    if (existingProduct) {
      return;
    }
    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);

    setWishlist(updatedWishlist);
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id)
  }

  

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
