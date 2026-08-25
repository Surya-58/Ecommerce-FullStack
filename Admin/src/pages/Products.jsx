import React, { useState, useEffect, useRef } from "react";
import "../styles/Products.css";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

const Products = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [feautured, setFeatured] = useState(false);

  const formRef = useRef(null);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchUnit = filterUnit === "All" || product.unit === filterUnit;

    return matchSearch && matchUnit;
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
      const product = {
        name,
        quantity,
        unit,
        price,
        category,
        image,
        stock,
        feautured,
      };
      const data = await updateProduct(editId, product);
      console.log(data);

      setMessage("product updated successfully ");

      handleGetProducts();
      setName("");
      setQuantity("");
      setUnit("");
      setPrice("");
      setEditId(null);
      setImage("");
      setCategory("");
      setStock("");
      setFeatured(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setQuantity(product.quantity);
    setUnit(product.unit);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock);
    setFeatured(product.feautured);

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
    if (!name || !category || !price) {
      setMessage("Please fill in Product Name, Category and Price");
      return;
    }
    try {
      const product = {
        name,
        quantity,
        unit,
        price,
        category,
        image,
        stock,
        feautured,
      };

      const data = await addProduct(product);
      console.log(data);

      setMessage("Product Added Successfully");
      handleGetProducts();
      setName("");
      setQuantity("");
      setUnit("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
      setFeatured(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
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
          quantity={quantity}
          setQuantity={setQuantity}
          unit={unit}
          setUnit={setUnit}
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
          feautured={feautured}
          setFeatured={setFeatured}
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

        <label className="label">Filter by Unit</label>
        <br />

        <select
          className="input"
          value={filterUnit}
          onChange={(e) => setFilterUnit(e.target.value)}
        >
          <option value="All">All units</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
        </select>
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
