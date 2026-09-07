import React from "react";
import DashboardCard from "../components/DashboardCard";
import "../styles/Home.css";
import { useState, useEffect } from "react";
import { getOrders, getProducts, getUsers } from "../services/api";
import RecentOrders from "../components/RecentOrders";
import DashboardChart from "../components/DashboardChart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const [productsData, usersData, ordersData] = await Promise.all([
        getProducts(),
        getUsers(),
        getOrders(),
      ]);

      setProducts(productsData);
      setUsers(usersData);
      setOrders(ordersData);
    };
    loadDashboard();
  }, []);

  const revenue = orders.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);

  const categories = [ ...new Set(products.map((product) => product.category))];
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Products" value={products.length} />
        <DashboardCard title="Orders" value={orders.length} />
        <DashboardCard title="Users" value={users.length} />
        <DashboardCard title="Categories" value={categories.length} />
        <DashboardCard title="Revenue" value={`₹${revenue}`} />

        <div className="dashboard-full-width">
          <DashboardChart />
        </div>

        <div className="dashboard-full-width">
          <RecentOrders orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Home;
