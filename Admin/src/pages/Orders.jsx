import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../services/api";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const handleGetOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      console.log("Orders:", data);

      setOrders(data || []);
    } catch (error) {
      console.log("Get Orders Error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      const data = await updateOrder(orderId, {
        orderStatus,
      });

      console.log("Order Status Updated:", data);

      setMessage("Order status updated successfully");

      await handleGetOrders();
    } catch (error) {
      console.log("Update Order Status Error:", error);
      setMessage(error.message);
    }
  };

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter(
          (order) => order.orderStatus === statusFilter
        );

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>Orders</h2>

      {message && <p>{message}</p>}

      <select
        className="input"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Order Placed">Order Placed</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Out for Delivery">
          Out for Delivery
        </option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <OrderTable
        orders={filteredOrders}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Orders;