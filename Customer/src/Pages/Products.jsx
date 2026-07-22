import React, { useState, useEffect } from "react";
import { getProducts } from "../Services/api";
import ProductGrid from "../Components/ProductGrid";
import searchIcon from "../Assets/icons/icon-search.png";
import xIcon from "../Assets/icons/icon-x.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  
  const filteredProducts = products.filter((product) => {
    const matchedSearch = product.name
    .toLowerCase()
    .includes(search.toLocaleLowerCase())

    const matchesCategory = 
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category)

    const matchesPrice = product.price <= maxPrice;

    const matchesStock = !inStockOnly || product.stock > 0;

    return matchedSearch && matchesCategory && matchesPrice  && matchesStock
  })

  const sortedProducts = [...filteredProducts]

  if(sortBy === "priceLow"){
    sortedProducts.sort((a,b) => a.price - b.price)
  }
  if(sortBy === "priceHigh"){
    sortedProducts.sort((a,b) => b.price - a.price)
  }
  if(sortBy === "nameAZ"){
    sortedProducts.sort((a,b) => a.name.localeCompare(b.name))
  }
  if(sortBy === "priceLow"){
    sortedProducts.sort((a,b) => b.name.localeCompare(a.name))
  }

  const handleGetProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="products-page container">
      <div className="products-page__header">
        <h1 className="text-section-title">All Products</h1>

        <p className="text-body-secondary">
          Browse our collection of fresh groceries and daily essentials.
        </p>
      </div>

      <div className="products-page__toolbar">
        <div className="search-bar">
          <span className="search-bar__icon">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-bar__icon-image"
            />
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="search-bar__input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-bar__clear"
              onClick={() => setSearch("")}
              type="button"
            >
              <img
                src={xIcon}
                alt="Clear Search"
                className="search-bar__clear-image"
              />
            </button>
          )}
        </div>

        <div className="select-wrap">
          <select 
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price : Low to High</option>
            <option value="priceHigh">Price : High to Low</option>
            <option value="nameAZ">Name A-Z</option>
            <option value="nameZA">Name Z-A</option>
          </select>
        </div>
      </div>

      <div className="products-page__content">
        {/* Filter Sidebar */}

        <aside className="filters">
          <h3 className="text-category-title">Filters</h3>

          <div className="filter-group">
            <h4 className="filter-group__title">Categories</h4>

            <label className="checkbox">
              <input type="checkbox"
              checked={selectedCategories.includes("Groceries")}
              onChange={() => handleCategoryChange("Groceries")} />
              <span className="checkbox__box"></span>
              Groceries
            </label>

            <label className="checkbox">
              <input type="checkbox"
              checked={selectedCategories.includes("Beverages")}
              onChange={() => handleCategoryChange("Beverages")} />
              <span className="checkbox__box"></span>
              Beverages
            </label>

            <label className="checkbox">
              <input type="checkbox"
              checked={selectedCategories.includes("Snacks")}
              onChange={() => handleCategoryChange("Snacks")} />
              <span className="checkbox__box"></span>
              Snacks
            </label>

            <label className="checkbox">
              <input type="checkbox"
              checked={selectedCategories.includes("Dairy")}
              onChange={() => handleCategoryChange("Dairy")} />
              <span className="checkbox__box"></span>
              Dairy
            </label>

            <label className="checkbox">
              <input type="checkbox" 
              checked={selectedCategories.includes("Personal Care")}
              onChange={() => handleCategoryChange("Personal Care")}/>
              <span className="checkbox__box"></span>
              Personal Care
            </label>
          </div>

          <div className="filter-group">
            <h4 className="filter-group__title">Price</h4>

            <input type="range" 
            className="range-slider" 
            min="0" 
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} />

            <div className="filter-price__values">
              <span>₹0</span>
              <span>₹{maxPrice}</span>
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-group__title">Availability</h4>

            <label className="checkbox">
              <input type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)} />
              <span className="checkbox__box"></span>
              In Stock Only
            </label>
          </div>
        </aside>

        {/* Product Grid */}

        <section className="results-grid">
          <ProductGrid products={sortedProducts} />
        </section>
      </div>
    </div>
  );
};

export default Products;
