import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../services/api";
import OrderTable from "../components/OrderTable";
import "../styles/Orders.css";

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

  const processingCount = orders.filter(
    (order) => order.orderStatus === "Processing"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const cancelledCount = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  ).length;

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <p className="orders-eyebrow">QuickCart Admin</p>
          <h1>Orders</h1>
          <p className="orders-subtitle">
            Manage and track customer orders.
          </p>
        </div>
      </div>

      <div className="orders-summary">
        <div className="order-summary-card">
          <span className="order-summary-label">All Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="order-summary-card">
          <span className="order-summary-label">Processing</span>
          <strong>{processingCount}</strong>
        </div>

        <div className="order-summary-card">
          <span className="order-summary-label">Delivered</span>
          <strong>{deliveredCount}</strong>
        </div>

        <div className="order-summary-card">
          <span className="order-summary-label">Cancelled</span>
          <strong>{cancelledCount}</strong>
        </div>
      </div>

      {message && (
        <div className="orders-message">
          {message}
        </div>
      )}

      <div className="orders-toolbar">
        <div>
          <h2>Order List</h2>
          <p>
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <select
          className="orders-filter"
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
      </div>

      <OrderTable
        orders={filteredOrders}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Orders;