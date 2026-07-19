import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
  { id: 1, name: "Fruits", icon: "🍎" },
  { id: 2, name: "Vegetables", icon: "🥦" },
  { id: 3, name: "Beverages", icon: "🥤" },
  { id: 4, name: "Dairy", icon: "🥛" },
  { id: 5, name: "Snacks", icon: "🍪" },
  { id: 6, name: "Household", icon: "🧴" },
];
  return (
    <section>
      <h2>Shop by Categories</h2>
      <div className="categories">
        {categories.map((category) => (
          <Link key={category.id} to={`/products?category=${category.name}`} className="category-tile">
            <div className="category-tile__icon">{category.icon}</div>
            <p className="category-tile__label">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
