import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingBag,
  Users,
  LayoutGrid,
  IndianRupee,
} from "lucide-react";

import DashboardCard from "../components/DashboardCard";
import RecentOrders from "../components/RecentOrders";
import DashboardChart from "../components/DashboardChart";
import "../styles/Home.css";

import {
  getOrders,
  getProducts,
  getUsers,
  getCategories,
} from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productsData, usersData, ordersData, categoriesData] =
          await Promise.all([
            getProducts(),
            getUsers(),
            getOrders(),
            getCategories(),
          ]);

        setProducts(productsData);
        setUsers(usersData);
        setOrders(ordersData);
        setCategories(categoriesData);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  const revenue = orders.reduce((acc, order) => {
    return acc + Number(order.amount || 0);
  }, 0);

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">QuickCart Admin</p>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Here's what's happening with your store today.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">

        <DashboardCard
          title="Products"
          value={products.length}
          icon={Package}
        />

        <DashboardCard
          title="Orders"
          value={orders.length}
          icon={ShoppingBag}
        />

        <DashboardCard
          title="Users"
          value={users.length}
          icon={Users}
        />

        <DashboardCard
          title="Categories"
          value={categories.length}
          icon={LayoutGrid}
        />

        <DashboardCard
          title="Revenue"
          value={`₹${revenue.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          highlight
        />

        <div className="dashboard-full-width dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <h2>Store Overview</h2>
              <p>Current store statistics</p>
            </div>
          </div>

          <DashboardChart
            products={products.length}
            users={users.length}
            orders={orders.length}
            categories={categories.length}
          />
        </div>

        <div className="dashboard-full-width">
          <RecentOrders orders={orders} />
        </div>

      </div>
    </div>
  );
};

export default Home;