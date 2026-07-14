import React, { useEffect, useState } from 'react'
import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "../services/api"

const Users = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("Customer")

  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("")
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5;


  const filteredUsers = users.filter((user) =>{
    const matchSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase())

      const matchRole = filterRole === "All" || user.role === filterRole;
      return matchSearch & matchRole
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = currentPage - usersPerPage

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  )

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  )

  useEffect

  const handleGetUsers = async() => {
    try {
      const data = await getUsers()
      setUsers(data)
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddUser = async() => {
    try {
      const user = {
        name,
        email,
        phone,
        role,
      }
      const data = await addUser(user)
      console.log(data);
      setMessage("User Added Successfully")
      handleGetUsers();

      setName("")
      setEmail("")
      setPhone("")
      setRole("")    
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setRole(user.role)
  }

  const handleUpdateUser = async() => {
    try {
      const user = {
        name,
        email,
        phone,
        role,
      }

      const data = await updateUser(editId, user)
      console.log(data);
      setMessage("User Updated Successfully")
      handleGetUsers()      
      setEditId(null)
      setName("")
      setEmail("")
      setPhone("")
      setRole("Customer")
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDelete = async(id) => {
    try {
      const data = await deleteUser(id)
      console.log(data);
      setMessage("User Deleted Successfully")
      handleGetUsers()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    handleGetUsers(1)
  },[search, filterRole])

  return (
    <div className='page'>
      <div className="container">
        <h1 className="title">User Manager</h1>

        <UserForm 
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        role={role}
        setRole={setRole}
        handleAddUser={handleAddUser}
        handleUpdateUser={handleUpdateUser}
        editId={editId}
        message={message}
        />

        <label className="label">Filter by Role</label>
          <select className="input"
          value={filterRole}
          onChange={(e)=>setFilterRole(e.target.value)}>
            <option value="All">All</option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
          </select>
          <br/>
        

        <label className="label">Search User</label>
        <br/>

        <input 
        type="text" 
        className="input"
        placeholder='Search User'
        value={search}
        onChange={(e)=>setSearch(e.target.value)} />
        <br />

        <UserTable 
        users={currentUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />

        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1} >Previous</button>
          {Array.from({length : totalPages}, (_, index) => (
          <button
          key={index}
          className={currentPage === index + 1 ? "active-page" : ""}
          onClick={()=>setCurrentPage(index + 1)}>
            {index + 1}
          </button>
          
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}>Next</button>
          
        </div>
      </div>

    </div>
  )
}

export default Users