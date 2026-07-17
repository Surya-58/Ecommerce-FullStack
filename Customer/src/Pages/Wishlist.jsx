import React from "react";
import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };
  return (
    <div>
      <h1>Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>No Products in the Wishlist</h2>
      ) : (
        wishlist.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} width="150" />
            <h2>{item.name}</h2>
            <p>₹ {item.price}</p>
            <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
            <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
