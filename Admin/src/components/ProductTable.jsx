import React from "react";

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <div className="products-table-card">
      <div className="products-table-header">
        <div>
          <h2>Products</h2>
          <p>Manage products available in your store.</p>
        </div>

        <span className="products-count">
          {products.length} products
        </span>
      </div>

      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="products-empty">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-info">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-thumb"
                        />
                      ) : (
                        <div className="product-thumb product-thumb--empty">
                          No Image
                        </div>
                      )}

                      <div>
                        <p className="product-name">{product.name}</p>

                        <p className="product-description">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="product-category">
                      {product.category}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`product-stock ${
                        product.stock <= 5
                          ? "product-stock--low"
                          : "product-stock--available"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="product-price">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <div className="product-actions">
                      <button
                        className="product-edit-button"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="product-delete-button"
                        onClick={() => handleDelete(product._id)}
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

export default ProductTable;