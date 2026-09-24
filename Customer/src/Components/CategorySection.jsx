import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { getCategories } from "../Services/categoryApi";

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
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon] || Package;

          return (
            <Link
              key={category._id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-tile"
            >
              <div className="category-tile__icon">
                <Icon size={34} strokeWidth={1.8} />
              </div>

              <p className="category-tile__label">{category.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;