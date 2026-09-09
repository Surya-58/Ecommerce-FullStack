import React from "react";

const UserForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  role,
  setRole,
  handleAddUser,
  handleUpdateUser,
  editId,
  message,
}) => {
  return (
    <div className="form-grid">
      <div className="form-group">
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Email</label>
        <input
          className="input"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Phone</label>
        <input
          className="input"
          type="text"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Role</label>
        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="form-group-full">
        <button
          className="btn-primary"
          onClick={editId ? handleUpdateUser : handleAddUser}
        >
          {editId ? "Update User" : "Add User"}
        </button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default UserForm;
