import React from 'react'

const UserForm = (
    {
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        role,
        setRole,
        handleAddUser,
        handleUpdateUser,
        editId,
        message,
    }
) => {
  return (
    <div>
        <label className='label'>Name</label>
        <br/>
        <input
        className='input'
        type='text'
        placeholder='Enter name'
        value={name}
        onChange={(e)=>setName(e.target.value)} 
        />
        <br/>

        <label className='label'>Email</label>
        <br/>
        <input 
        className='input'
        type='text'
        placeholder='Enter email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)} />
        <br/>

        <label className='label'>Phone</label>
        <br/>
        <input 
        className='input'
        type='text'
        placeholder='Enter phone'
        value={phone}
        onChange={(e)=>setPhone(e.target.value)} />
        <br/>


        <label className='label'>Role</label>
        <br/>
        <select 
        className='input'
        value={role}
        onChange={(e)=>setRole(e.target.value)} >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
        </select>
        <br/>

        <button className='btn-primary' onClick={editId ? handleUpdateUser : handleAddUser }>
            {editId ? "Update User" : "Add User"}
        </button>
        <p>{message}</p>
    
    </div>
  )
}

export default UserForm