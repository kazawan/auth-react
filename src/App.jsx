import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navi from './components/Navi';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Todos from './pages/Todos';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navi />
        <div className=' mt-2  w-full min-h-[600px]   '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  )
}