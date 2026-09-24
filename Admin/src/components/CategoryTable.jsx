import React from "react";

const CategoryTable = ({ categories, handleEdit, handleDelete }) => {
  return (
    <div className="categories-table-card">
      <div className="categories-table-header">
        <div>
          <h2>Categories</h2>
          <p>Manage the categories available in your store.</p>
        </div>

        <span className="categories-count">
          {categories.length} categories
        </span>
      </div>

      <div className="categories-table-wrapper">
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="2" className="products-empty">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>
                    <span className="category-name">
                      {category.name}
                    </span>
                  </td>

                  <td>
                    <div className="categories-actions">
                      <button
                        className="category-edit-button"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>

                      <button
                        className="category-delete-button"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;