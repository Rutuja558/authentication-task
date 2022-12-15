import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  </BrowserRouter>
}
