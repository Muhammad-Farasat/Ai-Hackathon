import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Admin />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
