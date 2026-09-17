import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../Services/categoryApi";

const categoryIcons = {
  Fruits: "🍎",
  Vegetables: "🥦",
  Beverages: "🥤",
  Dairy: "🥛",
  Snacks: "🍪",
  Household: "🧴",
};

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section>
      <h2>Shop by Categories</h2>

      <div className="categories">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="category-tile"
          >
            <div className="category-tile__icon">
              {categoryIcons[category.name] || "🛒"}
            </div>

            <p className="category-tile__label">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;