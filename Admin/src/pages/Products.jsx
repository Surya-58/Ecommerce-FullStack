import React, { useState, useEffect, useRef } from "react";
import "../styles/Products.css";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0); 

  const formRef = useRef(null);

  const handleGetCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const filteredProducts = products.filter((product) => {
  return product.name
    .toLowerCase()
    .includes(search.toLowerCase());
});

  const sortedProducts = [...filteredProducts];
  if (sortOrder === "lowToHigh") {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }
  if (sortOrder === "highToLow") {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const indexOfLastProduct = currentPage * productPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(sortedProducts.length / productPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const data = await deleteProduct(id);
      console.log(data);

      setMessage("Deleted Successfully");

      handleGetProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);

    // Only send image if a new image was selected
    if (image instanceof File) {
      formData.append("image", image);
    }

    const data = await updateProduct(editId, formData);

    console.log(data);

    setMessage("Product updated successfully");

    await handleGetProducts();

    setName("");
    setDescription("");
    setPrice("");
    setEditId(null);
    setImage("");
    setCategory("");
    setStock("");
    setImage("")
    setFileInputKey(prevKey => prevKey + 1); // Reset file input
  } catch (error) {
    console.log(error);
    setMessage(error.message);
  }
};
  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock);

    // scroll the form into view
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGetProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !category || !price) {
      setMessage(
        "Please fill in Product Name, Description, Category and Price",
      );
      return;
    }
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);

      if (image) {
        formData.append("image", image);
      }

      const data = await addProduct(formData);
      console.log(data);

      setMessage("Product Added Successfully");
      handleGetProducts();
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
      setImage("")

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, []);
  console.log(products);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Product Manager</h1>
        <div ref={formRef}>
          <ProductForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            message={message}
            editId={editId}
            handleAddProduct={handleAddProduct}
            handleUpdate={handleUpdate}
            handleGetProducts={handleGetProducts}
            image={image}
            setImage={setImage}
            category={category}
            setCategory={setCategory}
            stock={stock}
            setStock={setStock}
            categories={categories}
          />
        </div>
        <label className="label">Search Product</label>
        <br />

        <input
          className="input"
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />

        <label className="label"> Sort by price </label>
        <select
          className="input"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">None</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <br />

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active-page" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <ProductTable
          products={currentProducts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Products;
