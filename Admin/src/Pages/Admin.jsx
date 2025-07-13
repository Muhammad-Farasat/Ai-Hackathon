import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import ListProduct from './ListProduct';
import SideBar from '../Components/SideBar/SideBar';
import Orders from './Orders';
// Optional: Create a simple Dashboard component for the landing page
// import AdminDashboard from './AdminDashboard';

function Admin() {
  const token = localStorage.getItem('auth-token');

  // Your token protection is perfect as is.
  if (!token) {
    // Redirect to a specific login page, perhaps one styled for the admin portal
    return <Navigate to='/login' />;
  }

  return (
    // THEME CHANGE: Main container now controls the background and flex layout
    <section className='flex min-h-screen bg-gray-900'>
      <SideBar />

      {/* 
        ARCHITECTURAL IMPROVEMENT: Main Content Wrapper
        This div is the key change. It takes up the remaining space and pushes
        itself to the right of the sidebar, creating the main content area.
      */}
      <main className='flex-1 ml-64 max-lg:ml-20 max-sm:ml-0'>
        {/* The Routes component now renders its content inside this perfectly positioned main area */}
        <Routes>
          {/* 
            UX IMPROVEMENT: Add a default route.
            When a user goes to just "/admin", they will be redirected to the product list.
          */}
          <Route path='/' element={<Navigate to='/listofproduct' replace />} />
          
          {/* Your existing routes */}
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listofproduct' element={<ListProduct />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </main>
    </section>
  );
}

export default Admin;