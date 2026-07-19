import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({products}) => {
  return (
    <div>
        <h2>Featured Products</h2>
        {products.map((product) => (
        <ProductCard 
        key={product.id}
        product={product} />
        ))}
    </div>
  )
}

export default ProductGrid