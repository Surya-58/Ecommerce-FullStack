import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Sidebar.css'
import { FaBox, FaHome, FaUsers, FaShoppingCart, FaTags } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        <FaHome/> Dashboard{" "}
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaBox/>Products{" "}
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaTags/>Categories{" "}
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
       <FaShoppingCart/> Orders{" "}
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaUsers/>Users{" "}
      </NavLink>
    </div>
  );
};

export default Sidebar;
