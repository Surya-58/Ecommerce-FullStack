import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '../styles/Layout.css'

const Layout = () => {
  return (
    <div>
        <Navbar/>

        <div className='layout'>
            <Sidebar/>

            <div className='content'>
                <Outlet/>
            </div>
        </div>

    </div>
  )
}

export default Layout