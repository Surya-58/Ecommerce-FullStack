import React from "react";

const UserTable = ({ users, handleEdit, handleDelete }) => {
  const getRoleClass = (role) => {
    if (role === "admin") {
      return "user-role user-role--admin";
    }

    return "user-role user-role--customer";
  };

  return (
    <div className="users-table-card">
      <div className="users-table-wrapper">
        {users.length === 0 ? (
          <div className="users-empty">
            <h3>No users found</h3>
            <p>
              There are no users matching your search or filter.
            </p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <strong className="user-name">
                      {user.name}
                    </strong>
                  </td>

                  <td>
                    <span className="user-email">
                      {user.email}
                    </span>
                  </td>

                  <td>
                    <span className="user-phone">
                      {user.phone || "-"}
                    </span>
                  </td>

                  <td>
                    <span className={getRoleClass(user.role)}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="users-actions">
                      <button
                        className="user-edit-button"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>

                      <button
                        className="user-delete-button"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTable;