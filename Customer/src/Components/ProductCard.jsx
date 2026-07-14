import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div>
        <img src={product.image} 
        alt={product.name}
        width="120" 
        />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>{product.category}</p>
        {product.featured && <p>⭐Featured</p>}
        <button>View Product</button>
    </div>
  )
}

export default ProductCard