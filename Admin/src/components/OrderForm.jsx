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
    <div>
      <label className="label">Customer</label>
      <br />

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

      <br />

      <label className="label">Products</label>
      <br />

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
      <br />

      <label className="label">Quantity</label>
      <br />

      <input 
      type="number" 
      className="input" 
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      placeholder="Enter Quantity"
      />
      <br />

      <label className="label">Price</label>
      <br />

      <input 
      type="number" 
      className="input"
      value={price}
      readOnly
       />
       <br />

       <label className="label">Total</label>
       <br />

       <input 
       type="number" 
       className="input"
       value={total}
       readOnly />
       <br />

       <label  className="label"></label>
       <br />

       <select 
       className="input"
       value={status}
       onChange={(e) => setStatus(e.target.value)}
       >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
       </select>
       <br />

       <button 
       className="btn-primary"
       onClick={editId ? handleUpdateOrder : handleAddOrder}
       >{editId ? "Update Order" : "Add Order"}
       </button>
    </div>
  );
};

export default OrderForm;
