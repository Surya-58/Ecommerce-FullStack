import React from "react";

const RecentOrders = ({ orders }) => {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="container">
      <h2 className="title">Recent Orders</h2>

      <table className="table">
        <thead>
          <tr>
            <th className="th">Customer</th>
            <th className="th">Product</th>
            <th className="th">Quantity</th>
            <th className="th">Total</th>
            <th className="th">Status</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.length === 0 ? (
            <tr>
              <td className="td" colSpan="5">
                No recent orders
              </td>
            </tr>
          ) : (
            recentOrders.map((order) => (
              <tr key={order._id}>
                <td className="td">
                  {order.address?.name || "N/A"}
                </td>

                <td className="td">
                  {order.items?.map((item) => (
                    <div key={item._id}>
                      {item.name}
                    </div>
                  ))}
                </td>

                <td className="td">
                  {order.items?.map((item) => (
                    <div key={item._id}>
                      {item.quantity}
                    </div>
                  ))}
                </td>

                <td className="td">
                  ₹{order.amount}
                </td>

                <td className="td">
                  {order.orderStatus}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;