import React from "react";
import { useState, useEffect, useRef } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";
import "../styles/Categories.css";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;
  const formRef = useRef(null);

  const indexOfLastCategory = currentPage * categoriesPerPage;

  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName) {
      setMessage("Please fill in Category Name");
      return;
    }

    if (!categoryIcon) {
      setMessage("Please select a Category Icon");
      return;
    }

    try {
      const category = {
        name: categoryName,
        icon: categoryIcon,
      };

      const data = await addCategory(category);
      console.log(data);

      setMessage("Category Added Successfully");
      handleGetCategories();

      setCategoryName("");
      setCategoryIcon("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setCategoryName(category.name);
    setCategoryIcon(category.icon || "");

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const data = await deleteCategory(id);
      console.log(data);
      setMessage("Category Deleted Successfully");
      handleGetCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryName) {
      setMessage("Please fill in Category Name");
      return;
    }

    if (!categoryIcon) {
      setMessage("Please select a Category Icon");
      return;
    }

    try {
      const category = {
        name: categoryName,
        icon: categoryIcon,
      };

      const data = await updateCategory(editId, category);
      console.log(data);

      setMessage("Category Updated Successfully");
      handleGetCategories();

      setCategoryName("");
      setCategoryIcon("");
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categoryName);

  return (
    <div className="categories-page">
      <div className="categories-form-card">
        <div className="categories-form-header">
          <h1>Category Manager</h1>
          <p>Add and manage the categories in your store.</p>
        </div>

        <div className="categories-form-body" ref={formRef}>
          <CategoryForm
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            categoryIcon={categoryIcon}
            setCategoryIcon={setCategoryIcon}
            handleAddCategory={handleAddCategory}
            handleUpdateCategory={handleUpdateCategory}
            editId={editId}
            message={message}
          />
        </div>
      </div>

      <div className="categories-search">
        <label>Search Categories</label>

        <input
          className="categories-search-input"
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CategoryTable
        categories={currentCategories}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <div className="categories-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
