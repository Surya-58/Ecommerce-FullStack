import React from 'react'

const ProductTable = (
    {
        products,
        handleEdit,
        handleDelete,
    }
) => {
  return (
    <div>
      
        <table className="table">
          <thead>
            <tr>
              <th className="th">Image</th>
              <th className="th" >Product</th>
              <th className="th">Category</th>
              <th className="th">Quantity</th>
              <th className="th">Stock</th>
              <th className="th">Unit</th>
              <th className="th">Price</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {
              products.map((product)=>(
                <tr key={product.id}>
                  <td className="td">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      width="60"
                      height="60"
                      style={{
                        borderRadius: "8px",
                        objectFit : "cover"
                      }}
                     />
                  </td>
                  <td className="td">{product.name}</td>
                  <td className="td">{product.category}</td>
                  <td className="td">{product.quantity}</td>
                  <td className="td">{product.stock}</td>
                  <td className="td">{product.unit}</td>
                  <td className="td">{product.price}</td>
                  <td className="td">
                    <button className="btn-small" onClick={()=>handleEdit(product)} >Edit</button>
                  </td>
                  <td className="td">
                    <button className="btn-small-danger" onClick={()=>handleDelete(product.id)} >Delete</button>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default ProductTable