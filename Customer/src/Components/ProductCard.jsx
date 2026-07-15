import React from 'react'
import { Link } from 'react-router-dom'

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
        <Link to={`/products/${product.id}`} >
        <button>View Product</button>
        </Link>
        
    </div>
  )
}

export default ProductCard