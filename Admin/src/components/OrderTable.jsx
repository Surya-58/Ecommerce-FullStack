import React from "react";

const OrderTable = ({ orders, handleStatusChange }) => {
  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
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
                  #{order._id}
                </td>

                <td>
                  <p>{order.address?.name}</p>
                  <small>{order.address?.phone}</small>
                </td>

                <td>
                  {order.items?.map((item) => (
                    <div key={item._id}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td>
                  ₹{order.amount}
                </td>

                <td>
                  {order.paymentMethod}
                </td>

                <td>
                  {order.paymentStatus}
                </td>

                <td>
                  {order.orderStatus}
                </td>

                <td>
                  <select
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
  );
};

export default OrderTable;