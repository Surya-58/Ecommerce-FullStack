import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {currentUser , logout} = useContext(UserContext)

    const [showMenu, setShowMenu] = useState(false)
  return (
    <nav>
        <h2>QuickCart</h2>
        {
            currentUser ? (
                <>
                <h3>Welcome {currentUser.name}</h3>

                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
            )
        }

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
        <div>
            <button onClick={() => setShowMenu(!showMenu)}>Account</button>
            {showMenu && (
                <div>
                    {
                        currentUser ? (
                            <>
                            <p>Hello, {currentUser.name}</p>
                            <Link to="/profile">My Profile</Link>
                            <button>My Orders</button>
                            <button onClick={logout} >Logout</button>
                            </>
                        )  :  (
                            <>
                            <button>Login</button>
                            <button>Register</button>
                            </>
                        )
                    }
                </div>

            )}
        </div>

    </nav>
  )
}

export default Navbar