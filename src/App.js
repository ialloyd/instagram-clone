import React from 'react'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from './styles/global'
import Profile from './Components/Profile';
import Create from './Components/Create';
import { PublicRoute } from './Components/PublicRoute';
import { ProtectedRoute } from './Components/ProtectedRoute';

const App = () => {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App