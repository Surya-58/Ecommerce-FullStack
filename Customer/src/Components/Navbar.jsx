import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <h2>QuickCart</h2>

        <ul>
            <li>
                <NavLink to="/" >Home</NavLink>
            </li>

            <li>
                <NavLink to="/products" >Products</NavLink>
            </li>

            <li>
                <NavLink to="/wishlist" >Wishlist</NavLink>
            </li>

            <li>
                <NavLink to="/cart" >Cart</NavLink>
            </li>

            <li>
                <NavLink to="/login" >Login</NavLink>
            </li>
            
        </ul>

    </nav>
  )
}

export default Navbar