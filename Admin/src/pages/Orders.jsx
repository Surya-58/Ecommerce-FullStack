import React, { useEffect, useState } from "react";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getProducts,
  getUsers,
} from "../services/api";
import OrderForm from "../components/OrderForm";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const [total, setTotal] = useState(0);

  const [statusFilter, setStatusFilter] = useState("All")

  const handleGetOrders = async () => {
    const data = await getOrders();
    console.log("Orders :", data);
    setOrders(data);
  };

  const handleGetProducts = async () => {
    const data = await getProducts();
    console.log("Products :", data);
    setProducts(data);
  };

  const handleGetUsers = async () => {
    const data = await getUsers();
    console.log("Users :", data);
    setUsers(data);
  };

  useEffect(() => {
    handleGetOrders();
    handleGetProducts();
    handleGetUsers();
  }, []);

  useEffect(() => {
    const selectedProduct = products.find((item) => item.name === product);
    if (selectedProduct) {
      setPrice(selectedProduct.price);
    }
  }, [product, products]);

  useEffect(() => {
    setTotal(Number(price) * Number(quantity));
  }, [price, quantity]);

  const handleAddOrder = async () => {
    try {
      const order = {
        customer,
        product,
        quantity,
        price,
        total,
        status,
      };
      const data = await addOrder(order);
      console.log(data);

      setMessage("Order Added Successfully");
      handleGetOrders();

      setCustomer("");
      setProduct("");
      setPrice("");
      setQuantity("");
      setTotal("");
      setStatus("Pending");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (order) => {
    setEditId(order.id);
    setCustomer(order.customer);
    setProduct(order.product);
    setQuantity(order.quantity);
    setPrice(order.price);
    setTotal(order.total);
    setStatus(order.status);
  };

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = {
        customer,
        product,
        quantity,
        price,
        total,
        status,
      };
      await updateOrder(editId, updatedOrder);
      setMessage("Order Updated Successfully");

      handleGetOrders();

      setCustomer("");
      setProduct("");
      setQuantity("");
      setPrice("");
      setTotal(0);
      setStatus("Pending");
      setEditId(null)

    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async(id) => {
    try {
      await deleteOrder(id)

      setMessage("Order Deleted Successfully")

      handleGetOrders()
    } catch (error) {
      console.log(error); 
    }
  };

  const filteredOrder = statusFilter === "All" ? orders : orders.filter((order)=> order.status === statusFilter)

  return (
    <div>
      <OrderForm
        users={users}
        products={products}
        customer={customer}
        setCustomer={setCustomer}
        product={product}
        setProduct={setProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
        total={total}
        status={status}
        setStatus={setStatus}
        handleAddOrder={handleAddOrder}
        handleUpdateOrder={handleUpdateOrder}
        editId={editId}
      />
      <select 
      className="input"
      value={statusFilter}
      onChange={(e)=>setStatusFilter(e.target.value)}>
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <OrderTable
        orders={filteredOrder}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        
      />
    </div>
  );
};

export default Orders;
