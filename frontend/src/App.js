import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/features/auth/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
        {/* public routes */}
          <Route index element={<Public/>}/>
          <Route path="login" element={<Login/>} />
          {/* Protected routes */}
          {/* dash board */}
          {/* persists login, add product*/}
          {/* edit product */}
    </Routes>
  )
}

export default App