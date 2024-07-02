import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/features/auth/Login'
import Register from './components/features/auth/Register'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
        {/* public routes */}
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          {/* Protected routes */}
          {/* dash board */}
          {/* persists login, add product*/}
          {/* edit product */}
    </Routes>
  )
}

export default App