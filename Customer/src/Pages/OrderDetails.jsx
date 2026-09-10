import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderByIdApi, cancelOrderApi } from "../Services/orderApi";
import "../Styles/Pages/orderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrderDetails = async () => {
    try {
      setLoading(true);

      const data = await getOrderByIdApi(orderId);

      console.log("Order Details:", data);

      setOrder(data.order);
    } catch (error) {
      console.log("Get Order Details Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await cancelOrderApi(orderId);

      alert("Order cancelled successfully");

      getOrderDetails();
    } catch (error) {
      console.log("Cancel Order Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Order Details</h1>
        <p>{error}</p>

        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <h1>Order not found</h1>

        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  return (
    <div className="container order-details-page">
      <button
        className="order-details-back"
        onClick={() => navigate("/orders")}
      >
        ← Back to Orders
      </button>

      <h1 className="order-details-title">Order Details</h1>

      <div className="order-details-grid">
        {/* LEFT SIDE */}
        <div>
          {/* Order Information */}
          <div className="order-details-card">
            <h2>Order Information</h2>

            <div className="order-info">
              <div>
                <p className="order-info__label">Order ID</p>

                <p className="order-info__value">#{order._id}</p>
              </div>

              <div>
                <p className="order-info__label">Order Status</p>

                <p className="order-status">{order.orderStatus}</p>
              </div>

              <div>
                <p className="order-info__label">Payment Method</p>

                <p className="order-info__value">{order.paymentMethod}</p>
              </div>

              <div>
                <p className="order-info__label">Payment Status</p>

                <p className="order-info__value">{order.paymentStatus}</p>
              </div>
            </div>
            {![
              "Shipped",
              "Out for Delivery",
              "Delivered",
              "Cancelled",
            ].includes(order.orderStatus) && (
              <button className="btn btn--danger" onClick={handleCancelOrder}>
                Cancel Order
              </button>
            )}
          </div>

          {/* Products */}
          <div className="order-details-card">
            <h2>Ordered Products</h2>

            {order.items?.map((item) => {
              return (
                <div className="order-product" key={item._id}>
                  <img
                    className="order-product__image"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="order-product__info">
                    <h3 className="order-product__name">{item.name}</h3>

                    <p className="order-product__meta">
                      Quantity: {item.quantity}
                    </p>

                    <p className="order-product__price">₹{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Address */}
          <div className="order-details-card">
            <h2>Delivery Address</h2>

            <div className="delivery-address">
              <p className="delivery-address__name">{order.address?.name}</p>

              <p>{order.address?.phone}</p>

              <p>{order.address?.street}</p>

              <p>
                {order.address?.city}, {order.address?.state}
              </p>

              <p>{order.address?.pincode}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* Payment */}
          <div className="order-details-card">
            <h2>Payment Information</h2>

            <div className="payment-info">
              <p>
                Payment Method: <strong>{order.paymentMethod}</strong>
              </p>

              <p>
                Payment Status: <strong>{order.paymentStatus}</strong>
              </p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="order-details-card">
            <h2>Price Summary</h2>

            <div className="price-row">
              <span>Order Total</span>

              <span>₹{order.amount}</span>
            </div>

            <div className="price-row price-row--total">
              <span>Total</span>

              <span>₹{order.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
