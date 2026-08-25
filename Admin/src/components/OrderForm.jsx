import React from "react";

const OrderForm = ({
  users,
  products,
  customer,
  setCustomer,
  product,
  setProduct,
  quantity,
  setQuantity,
  price,
  setPrice,
  total,
  handleAddOrder,
  status,
  setStatus,
  handleUpdateOrder,
  editId,
}) => {
  return (
    <div className="form-grid">

      <div className="form-group">
        <label className="label">Customer</label>
        <select
          className="input"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Products</label>
        <select 
        className="input"
        value={product}
        onChange={(e)=>setProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.name} >
              {product.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Quantity</label>
        <input 
        type="number" 
        className="input" 
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity"
        />
      </div>

      <div className="form-group">
        <label className="label">Price</label>
        <input 
        type="number" 
        className="input"
        value={price}
        readOnly
         />
      </div>

      <div className="form-group">
        <label className="label">Total</label>
        <input 
        type="number" 
        className="input"
        value={total}
        readOnly />
      </div>

      <div className="form-group">
        <label className="label">Status</label>
        <select 
        className="input"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="form-group-full">
        <button 
        className="btn-primary"
        onClick={editId ? handleUpdateOrder : handleAddOrder}
        >{editId ? "Update Order" : "Add Order"}
        </button>
      </div>

    </div>
  );
};

export default OrderForm;
