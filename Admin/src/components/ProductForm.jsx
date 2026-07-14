import React from 'react'
import '../styles/Products.css'

const ProductForm = ({
    name,
    setName,
    quantity,
    setQuantity,    
    unit,
    setUnit,
    price,
    setPrice,
    handleAddProduct,
    handleUpdate,
    message,
    editId,
    handleGetProducts,
    search,
    setSearch,
    image,
    setImage,
    category,
    setCategory,
    stock,
    setStock,
    feautured,
    setFeatured,
    
}) => {
  return (
    <div>
        <label className="label">Product Name</label>
        <br/>
        <input 
        className="input"
        type='text' 
        placeholder='Enter product name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
         />
        <br/>

        <label className="label">Category</label>
        <br/>
        <select className="input"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Personal">Personal</option>
          <option value="Household">Household</option>
        </select>
        <br />

    
        <label className="label">Quantity</label>
        <br />
        <input 
        className="input"
        type="number" 
        placeholder="Enter Quantity"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}/>
        <br/>

        <label className="label">Stock</label>
        <br />
        <input 
        type="number"
        className="input"
        placeholder='Enter the Stock'
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
         />
         <br />

        <label className="label">Unit</label>
        <br/>
        <select
        className="input"
        value={unit}
        onChange={(e)=>setUnit(e.target.value)}>
          <option> Select Unit</option>
          <option>ml</option>
          <option>L</option>
          <option>kg</option>
          <option>g</option>
        </select>
        <br/>

        <label className="label">Price</label>
        <br/>
        <input 
        className="input"
        type="number" 
        placeholder='Enter Price'
        value={price}
        onChange={(e)=>setPrice(e.target.value)} />
        <br/>
        <label className="label">Image</label>
        <br />

        <input type="text" className="input" 
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder='Enter image URL' />
        <br />

        <label className="label">
          <input type='checkbox'
          checked={feautured}
          onChange={(e)=>setFeatured(e.target.checked)}
          />Feautured Product</label>
          <br />
          <br />
        <button className="btn-primary" onClick={editId ? handleUpdate : handleAddProduct}>{editId ? "Update product" : "Add product"}</button>
      
        <p className="message">{message}</p>
        
        
    </div>
  )
}

export default ProductForm