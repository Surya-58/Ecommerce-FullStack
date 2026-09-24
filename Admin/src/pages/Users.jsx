import React, { useEffect, useState, useRef } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/api";
import "../styles/Users.css";

const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const formRef = useRef(null);

  const handleGetUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchRole =
      filterRole === "All" || user.role === filterRole;

    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const customerCount = users.filter(
    (user) => user.role === "customer"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "admin"
  ).length;

  const handleAddUser = async () => {
    if (!name || !email || !phone) {
      setMessage("Please fill in Name, Email and Phone");
      return;
    }

    try {
      const user = {
        name,
        email,
        password,
        phone,
        role,
      };

      const token = localStorage.getItem("token");

      await addUser(user, token);

      setMessage("User Added Successfully");

      await handleGetUsers();

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("customer");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRole(user.role);
    setPassword("");

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleUpdateUser = async () => {
    try {
      const user = {
        name,
        email,
        password,
        phone,
        role,
      };

      const token = localStorage.getItem("token");

      await updateUser(editId, user, token);

      setMessage("User Updated Successfully");

      await handleGetUsers();

      setEditId(null);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("customer");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await deleteUser(id, token);

      setMessage("User Deleted Successfully");

      await handleGetUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterRole]);

  return (
    <div className="users-page">

      <div className="users-header">
        <div>
          <p className="users-eyebrow">QuickCart Admin</p>

          <h1>User Manager</h1>

          <p className="users-subtitle">
            Manage customers and administrators in your store.
          </p>
        </div>
      </div>

      <div className="users-summary">

        <div className="user-summary-card">
          <span>All Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="user-summary-card">
          <span>Customers</span>
          <strong>{customerCount}</strong>
        </div>

        <div className="user-summary-card">
          <span>Admins</span>
          <strong>{adminCount}</strong>
        </div>

      </div>

      <div
        className="users-form-card"
        ref={formRef}
      >
        <div className="users-form-header">
          <div>
            <h2>
              {editId ? "Update User" : "Add New User"}
            </h2>

            <p>
              {editId
                ? "Update the selected user's information."
                : "Create a new customer or administrator account."}
            </p>
          </div>
        </div>

        <div className="users-form-body">
          <UserForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
            role={role}
            setRole={setRole}
            handleAddUser={handleAddUser}
            handleUpdateUser={handleUpdateUser}
            editId={editId}
            message={message}
          />
        </div>
      </div>

      <div className="users-toolbar">

        <div>
          <h2>Users</h2>

          <p>
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1
              ? "user"
              : "users"}
          </p>
        </div>

        <div className="users-filters">

          <input
            type="text"
            className="users-search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="users-filter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

        </div>
      </div>

      <UserTable
        users={currentUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <div className="users-pagination">

        <button
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? "active-page"
                  : ""
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Users;