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
    <div className="users-form-grid">
      <div className="users-form-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="users-form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="users-form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder={editId ? "Enter new password" : "Enter password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="users-form-group">
        <label>Phone</label>
        <input
          type="text"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="users-form-group">
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="users-form-action">
        <button
          className="users-primary-button"
          onClick={editId ? handleUpdateUser : handleAddUser}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      {message && (
        <p className="users-message">
          {message}
        </p>
      )}
    </div>
  );
};

export default UserForm;