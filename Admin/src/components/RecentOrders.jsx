import React from 'react'

const RecentOrders = ({orders}) => {
    const recentOrders = orders.slice(-5).reverse()

  return (
    <div className='container'>
    <h2 className='title'>Recent Orders</h2>

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
            {recentOrders.map((order)=>(
                <tr key={order.id}>
                <td className="td">{order.customer}</td>
                <td className="td">{order.product}</td>
                <td className="td">{order.quantity}</td>
                <td className="td">{order.total}</td>
                <td className="td">{order.status}</td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default RecentOrders