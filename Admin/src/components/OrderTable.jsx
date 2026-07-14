import React from 'react'

const OrderTable = ({
    orders,
    handleEdit,
    handleDelete,
}) => {

  return (
    <table className='table'>
        <thead>
            <tr>
                <th className="th">Customer</th>
                <th className="th">Product</th>
                <th className="th">Quantity</th>
                <th className="th">Price</th>
                <th className="th">Total</th>
                <th className="th">Status</th>
                <th className="th">Actions</th>
            </tr>
        </thead>
        <tbody>
           {orders.map((order)=> (
            <tr key={order.id} >
                <td className="td">{order.customer}</td>
                <td className="td">{order.product}</td>
                <td className="td">{order.quantity}</td>
                <td className="td">{order.price}</td>
                <td className="td">{order.total}</td>
                <td className="td">{order.status}</td>
                <td className="td">
                    <button 
                    className="btn-small"
                    onClick={()=>handleEdit(order)}>
                    Edit
                    </button>
                    <button className="btn-small-danger"
                    onClick={()=>handleDelete(order.id)}>
                        Delete
                    </button>
                </td>
                </tr>
           ))}
            
        </tbody>
    </table>
  )
}

export default OrderTable