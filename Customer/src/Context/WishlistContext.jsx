import React, { createContext, useEffect, useState } from "react";

import {
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
  clearWishlistApi,
} from "../Services/wishlistApi";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlistApi();

      setWishlist(data.wishlist?.products || []);
    } catch (error) {
      console.log("Get Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const data = await addToWishlistApi(product._id);

      console.log("Add To Wishlist:", data);

      await getWishlist();
    } catch (error) {
      console.log("Add To Wishlist Error:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const data = await removeFromWishlistApi(productId);

      console.log("Remove From Wishlist:", data);

      await getWishlist();
    } catch (error) {
      console.log("Remove From Wishlist Error:", error);
    }
  };

  const clearWishlist = async () => {
    try {
      const data = await clearWishlistApi();

      console.log("Clear Wishlist:", data);

      await getWishlist();
    } catch (error) {
      console.log("Clear Wishlist Error:", error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (product) => product._id === productId
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getWishlist();
    } else {
      setWishlist([]);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        loading,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;