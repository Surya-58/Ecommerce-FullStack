import React from "react";
import {
  Apple,
  Carrot,
  CupSoda,
  Milk,
  Cookie,
  SprayCan,
  Wheat,
  Beef,
  Snowflake,
  CakeSlice,
  Coffee,
  Package,
} from "lucide-react";

const categoryIcons = {
  apple: Apple,
  carrot: Carrot,
  "cup-soda": CupSoda,
  milk: Milk,
  cookie: Cookie,
  "spray-can": SprayCan,
  wheat: Wheat,
  beef: Beef,
  snowflake: Snowflake,
  "cake-slice": CakeSlice,
  coffee: Coffee,
  package: Package,
};

const CategoryForm = ({
  categoryName,
  setCategoryName,
  categoryIcon,
  setCategoryIcon,
  handleAddCategory,
  handleUpdateCategory,
  editId,
  message,
}) => {
  return (
    <div className="categories-form-content">

      <div className="categories-form-group">
        <label>Category Name</label>

        <input
          type="text"
          className="categories-input"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      <div className="categories-form-group">
        <label>Category Icon</label>

        <div className="category-icon-grid">
          {Object.entries(categoryIcons).map(([iconName, Icon]) => (
            <button
              type="button"
              key={iconName}
              className={`category-icon-option ${
                categoryIcon === iconName
                  ? "category-icon-option--active"
                  : ""
              }`}
              onClick={() => setCategoryIcon(iconName)}
              title={iconName}
            >
              <Icon size={21} strokeWidth={1.8} />
            </button>
          ))}
        </div>
      </div>

      <button
        className="categories-form-button"
        onClick={editId ? handleUpdateCategory : handleAddCategory}
      >
        {editId ? "Update Category" : "Add Category"}
      </button>

      {message && (
        <p className="categories-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default CategoryForm;