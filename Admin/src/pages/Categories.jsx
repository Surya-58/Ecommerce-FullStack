import React from "react";
import { useState, useEffect } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

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
    try {
      const category = {
        name: categoryName,
      };
      const data = await addCategory(category);
      console.log(data);
      setMessage("Category Added Successfully");
      handleGetCategories();
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    setEditId(category.id);
    setCategoryName(category.name);
  };
  const handleDelete = async (id) => {
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
    try {
      const category = {
        name: categoryName,
      };
      const data = await updateCategory(editId, category);
      console.log(data);
      setMessage("Category Updated Successfully");
      handleGetCategories();
      setCategoryName("");
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categoryName);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Category Manager</h1>

        <CategoryForm
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          handleAddCategory={handleAddCategory}
          handleUpdateCategory={handleUpdateCategory}
          editId={editId}
          message={message}
        />

        <label className="label">Search</label>
        <br />

        <input
          className="input"
          type="text"
          placeholder="Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CategoryTable
          categories={currentCategories}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <div className="pagination">
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
    </div>
  );
};

export default Categories;
