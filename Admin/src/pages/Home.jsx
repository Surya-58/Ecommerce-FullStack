import React from "react";
import DashboardCard from "../components/DashboardCard";
import "../styles/Home.css";
import { useState, useEffect } from "react";
import { getCategories, getOrders, getProducts, getUsers } from "../services/api";
import RecentOrders from "../components/RecentOrders";
import DashboardChart from "../components/DashboardChart";

const Home = () => {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    const loadDashboard = async() => {
      const [
        productsData,
        usersData,
        ordersData,
        categoriesData
      ] = await Promise.all([
        getProducts(),
        getUsers(),
        getOrders(),
        getCategories(),
      ])
      setProducts(productsData)
      setUsers(usersData)
      setOrders(ordersData)
      setCategories(categoriesData)
    }
    loadDashboard()

  },[])

  const revenue = orders.reduce((acc,order) => {
    return acc + order.total;
  }, 0)

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Products" value={products.length} />
        <DashboardCard title="Orders" value={orders.length} />
        <DashboardCard title="Users" value={users.length} />
        <DashboardCard title="Categories" value={categories.length} />
        <DashboardChart />
        <DashboardCard title="Revenue" value={`₹${revenue}`} />
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default Home;
