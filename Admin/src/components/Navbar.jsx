import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <h2>E-commerce Admin</h2>
        <div className='nav-links'>
            <Link to="/" >Home</Link>
            <Link to="/login">Login</Link>

        </div>
        
    </nav>
  )
}

export default Navbar