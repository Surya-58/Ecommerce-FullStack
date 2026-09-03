import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrdersApi } from "../Services/orderApi";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      setLoading(true);

      const data = await getMyOrdersApi();

      console.log("My Orders:", data);

      setOrders(data.orders || []);
    } catch (error) {
      console.log("Get Orders Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="container orders-page">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container orders-page">
        <h1>My Orders</h1>
        <p className="orders-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container orders-page">

      <div className="orders-page__header">
        <h1>My Orders</h1>
        <p>View and track your recent orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders found</h2>
          <p>You haven't placed any orders yet.</p>

          <button
            className="btn btn--primary"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div className="order-card__header">

                <div>
                  <p className="order-card__label">
                    Order ID
                  </p>

                  <h3 className="order-card__id">
                    #{order._id}
                  </h3>
                </div>

                <div className="order-card__status">
                  <span>
                    {order.orderStatus}
                  </span>
                </div>

              </div>

              <div className="order-card__details">

                <div>
                  <p className="order-card__label">
                    Total Amount
                  </p>

                  <p className="order-card__value">
                    ₹{order.amount}
                  </p>
                </div>

                <div>
                  <p className="order-card__label">
                    Payment
                  </p>

                  <p className="order-card__value">
                    {order.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="order-card__label">
                    Payment Status
                  </p>

                  <p className="order-card__value">
                    {order.paymentStatus}
                  </p>
                </div>

              </div>

              <div className="order-card__footer">

                <button
                  className="btn btn--secondary"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View Details
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;