import React from 'react'

const UserTable = (
  {
    users,
    handleEdit,
    handleDelete,
  }
) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th">Name</th>
          <th className="th">Email</th>
          <th className="th">Phone</th>
          <th className="th">Role</th>
          <th className="th">Actions</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {users.map((user) => (
          <tr key={user.id}>
          <td className="td">{user.name}</td>
          <td className="td">{user.email} </td>
          <td className="td">{user.phone}</td>
          <td className="td">{user.role}</td>

          <td className="td">
            <button className='btn-small' onClick={()=>handleEdit(user)} >
              Edit
            </button>
            <button className="btn-small-danger" onClick={()=>handleDelete(user.id)}>
              Delete
            </button>
          </td>
        </tr>

        ))}
      
        
      </tbody>
    </table>
  )
}

export default UserTable