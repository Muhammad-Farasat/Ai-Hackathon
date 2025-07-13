import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast'; // Using toast for error handling
import { useNavigate } from 'react-router-dom'; // Better for SPA navigation

function LoginSignup() {
  const [state, setState] = useState('Log in');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate(); // Hook for programmatic navigation

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleResponse = (responsiveData) => {
    if (responsiveData.success) {
      localStorage.setItem('auth-token', responsiveData.token);
      if (responsiveData.user) {
        localStorage.setItem('user', JSON.stringify(responsiveData.user));
      }
      toast.success(state === 'Log in' ? 'Logged in successfully!' : 'Account created successfully!');
      navigate('/'); // Use navigate instead of window.location.replace
    } else {
      // Use toast for a better UX than alert()
      toast.error(responsiveData.errors || 'An error occurred. Please try again.');
    }
  };

  const login = async () => {
    let responsiveData;
    await fetch(`${backend_url}/login`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((resp) => resp.json()).then((data) => responsiveData = data);
    handleResponse(responsiveData);
  };

  const signup = async () => {
    let responsiveData;
    await fetch(`${backend_url}/signup`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((resp) => resp.json()).then((data) => responsiveData = data);
    handleResponse(responsiveData);
  };

  return (
    // THEME CHANGE: Dark background for the whole page
    <section className='flex justify-between min-h-screen bg-black'>
      {/* Image Panel - Enhanced with Serif Font */}
      <div style={{ clipPath: 'polygon(0 0, 98% 0, 79% 100%, 0% 100%)' }} className='bg-login_img w-3/6 h-[100vh] max-sm:hidden relative bg-cover bg-center'>
        <div className='absolute inset-0 bg-[#0e0e0e99] flex items-center justify-center'>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-white p-8 max-w-md">
            <h2 className="text-5xl font-serif font-bold mb-4">Welcome</h2>
            <p className="text-lg opacity-90">
              {state === 'Log in' ? 'Access your curated world of fashion.' : 'Begin your journey with UrbanFabric.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Panel */}
      <div className='flex-1 flex justify-center items-center p-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='w-full max-w-sm'>
          {/* THEME CHANGE: Dark, bordered form card */}
          <div className='bg-[#1a1a1a] rounded-lg shadow-2xl p-8 border border-gray-800'>
            <motion.div key={state} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* THEME CHANGE: Themed heading */}
              <h1 className='text-3xl font-serif font-bold text-center mb-8 text-white'>{state}</h1>
              <div className='space-y-6'>
                {state === 'Sign up' && (
                  <div className="relative">
                    <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                    <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Username"
                      // THEME CHANGE: Themed input field
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-gray-500"
                    />
                  </div>
                )}
                <div className="relative">
                  <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                  <input name="email" type="email" placeholder="Email" value={formData.email} onChange={changeHandler}
                    // THEME CHANGE: Themed input field
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                  <input name="password" type="password" placeholder="Password" value={formData.password} onChange={changeHandler}
                    // THEME CHANGE: Themed input field
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-gray-500"
                  />
                </div>
                {/* THEME CHANGE: Themed primary button */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={state === 'Log in' ? login : signup}
                  className="w-full bg-amber-400 text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-6 hover:bg-amber-300 transition-all">
                  {state}
                  <FiArrowRight />
                </motion.button>
              </div>
              <div className="mt-6 text-center">
                {state === 'Log in' ? (
                  // THEME CHANGE: Themed toggle link
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button onClick={() => setState('Sign up')} className="font-semibold text-amber-400 hover:underline">Sign up</button>
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <button onClick={() => setState('Log in')} className="font-semibold text-amber-400 hover:underline">Log in</button>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LoginSignup;