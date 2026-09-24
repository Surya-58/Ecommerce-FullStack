import React from "react";

const RecentOrders = ({ orders }) => {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-badge status-badge--delivered";

      case "Out for Delivery":
        return "status-badge status-badge--out";

      case "Processing":
        return "status-badge status-badge--processing";

      case "Cancelled":
        return "status-badge status-badge--cancelled";

      default:
        return "status-badge";
    }
  };

  return (
    <div className="recent-orders-card">
      <div className="recent-orders-header">
        <div>
          <h2>Recent Orders</h2>
          <p>Latest orders placed in your store</p>
        </div>
      </div>

      <div className="recent-orders-table-wrapper">
        <table className="recent-orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="recent-orders-empty">
                  No recent orders
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="recent-orders-customer">
                    {order.address?.name || "N/A"}
                  </td>

                  <td>
                    <div className="recent-orders-products">
                      {order.items?.map((item) => (
                        <div key={item._id}>{item.name}</div>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div className="recent-orders-products">
                      {order.items?.map((item) => (
                        <div key={item._id}>{item.quantity}</div>
                      ))}
                    </div>
                  </td>

                  <td className="recent-orders-total">
                    ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className={getStatusClass(order.orderStatus)}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;