import React, { useState } from 'react';

const Login = () => {
    // Your existing logic (unchanged)
    const [formData, setFormData] = useState({ email: '', password: '' });
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const setlogin = async () => {
        const response = await fetch(`${backend_url}/adminLogin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('auth-token', data.token);
            window.location.href = '/';
        }
    };

    // Purely visual redesign below
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
                    <p className="text-gray-500 mt-1">Enter your credentials</p>
                </div>

                {/* Form (same logic handlers) */}
                <div className="space-y-5">
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={changeHandler}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={changeHandler}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>
                    <button
                        onClick={() => setlogin()}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition"
                    >
                        Login
                    </button>
                </div>

                {/* Subtle footer */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} UrbanFabric
                </div>
            </div>
        </div>
    );
};

export default Login;