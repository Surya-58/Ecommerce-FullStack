import React from "react";

const OrderTable = ({ orders, handleStatusChange }) => {
  const getOrderStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "order-status order-status--delivered";

      case "Cancelled":
        return "order-status order-status--cancelled";

      case "Processing":
        return "order-status order-status--processing";

      case "Out for Delivery":
        return "order-status order-status--out";

      case "Shipped":
        return "order-status order-status--shipped";

      default:
        return "order-status order-status--placed";
    }
  };

  const getPaymentStatusClass = (status) => {
    if (status === "Paid") {
      return "payment-status payment-status--paid";
    }

    return "payment-status payment-status--pending";
  };

  const getShortOrderId = (id) => {
    if (!id) return "-";

    return id.slice(-8).toUpperCase();
  };

  return (
    <div className="orders-table-card">
      <div className="orders-table-wrapper">
        {orders.length === 0 ? (
          <div className="orders-empty">
            <h3>No orders found</h3>
            <p>
              There are no orders matching the selected status.
            </p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <span className="order-id">
                      #{getShortOrderId(order._id)}
                    </span>
                  </td>

                  <td>
                    <div className="order-customer">
                      <strong>
                        {order.address?.name || "Unknown"}
                      </strong>

                      <small>
                        {order.address?.phone || "-"}
                      </small>
                    </div>
                  </td>

                  <td>
                    <div className="order-products">
                      {order.items?.map((item) => (
                        <div
                          className="order-product-item"
                          key={item._id}
                        >
                          <span>{item.name}</span>
                          <small>× {item.quantity}</small>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td>
                    <strong className="order-total">
                      ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span className="payment-method">
                      {order.paymentMethod || "-"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={getPaymentStatusClass(
                        order.paymentStatus
                      )}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={getOrderStatusClass(
                        order.orderStatus
                      )}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      className="order-status-select"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Order Placed">
                        Order Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderTable;