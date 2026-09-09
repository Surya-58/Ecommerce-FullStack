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
  handleGetProducts,
  search,
  setSearch,
  image,
  setImage,
  category,
  setCategory,
  stock,
  setStock,
}) => {
  return (
    <div>
      <div className="form-grid">
        <div className="form-group">
          <label className="label">Product Name</label>
          <input
            className="input"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group form-group-full">
          <label className="label">Description</label>

          <textarea
            className="input"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="label">Category</label>
          <select
            className="input"
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

        <div className="form-group">
          <label className="label">Stock</label>
          <input
            type="number"
            className="input"
            placeholder="Enter the Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Price</label>
          <input
            className="input"
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group form-group-full">
          <label className="label">Product Image</label>
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

      </div>

      <button
        className="btn-primary"
        onClick={editId ? handleUpdate : handleAddProduct}
      >
        {editId ? "Update product" : "Add product"}
      </button>

      <p className="message">{message}</p>
    </div>
  );
};

export default ProductForm;
