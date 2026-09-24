import React from "react";
import "../styles/Products.css";

const ProductForm = ({
  name,
  setName,
  description,
  setDescription,
  categories,
  price,
  setPrice,
  handleAddProduct,
  handleUpdate,
  message,
  editId,
  image,
  setImage,
  category,
  setCategory,
  stock,
  setStock,
  fileInputKey,
}) => {
  return (
    <div className="products-form-card">
      <div className="products-form-header">
        <div>
          <h2>{editId ? "Update Product" : "Add New Product"}</h2>
          <p>
            {editId
              ? "Update the selected product details."
              : "Add a new product to your store catalog."}
          </p>
        </div>
      </div>

      <div className="products-form-grid">
        <div className="products-form-group">
          <label>Product Name</label>

          <input
            className="products-input"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="products-form-group">
          <label>Category</label>

          <select
            className="products-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="products-form-group">
          <label>Price</label>

          <input
            className="products-input"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="products-form-group">
          <label>Stock</label>

          <input
            className="products-input"
            type="number"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="products-form-group products-form-group--full">
          <label>Description</label>

          <textarea
            className="products-input products-textarea"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        <div className="products-form-group products-form-group--full">
          <label>Product Image</label>

          <label className="products-file-upload">
            <span className="products-file-button">Choose Image</span>

            <span className="products-file-name">
              {image ? image.name : "No image selected"}
            </span>

            <input
              type="file"
              accept="image/*"
              key={fileInputKey}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="products-form-actions">
        <button
          className="products-primary-button"
          onClick={editId ? handleUpdate : handleAddProduct}
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {message && <p className="products-message">{message}</p>}
    </div>
  );
};

export default ProductForm;
