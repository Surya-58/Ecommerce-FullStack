import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Layout from './components/Layout'


const App = () => {
  return (
  
    
  <Routes>

  <Route path="/" element={<Layout />} >

    <Route index element={<Home/>} />
    <Route path="products" element={<Products/>} />
    <Route path="categories" element={<Categories/>} />
    <Route path="orders" element={<Orders/>} />
    <Route path="users" element={<Users/>} />
    
  </Route>
      
    <Route path="/login" element={<Login/>} />
    <Route path="*" element={<NotFound/>} />


  </Routes>
    
  
    
  )
}

export default App