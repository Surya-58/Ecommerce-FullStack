import React from 'react'
import { createContext, useState } from 'react'

export const WishlistContext = createContext()

const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([])

  return (
    <WishlistContext.Provider 
    value={{
        wishlist,
        setWishlist,
    }}
    >

    </WishlistContext.Provider>
  )
}

export default WishlistProvider;