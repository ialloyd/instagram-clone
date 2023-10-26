import React from 'react'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import { Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App