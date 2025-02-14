import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';  // ✅ Import notification functions
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import Toastify CSS

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        identifier: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1337/api/auth/local", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            });

            const data = await response.json();

            if (data.jwt) {
                localStorage.setItem("token", data.jwt);
                handleSuccess("Login successful! Redirecting..."); // ✅ Only Toastify shows success
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1000);
            } else {
                handleError("Login failed. Check your credentials."); // ❌ Only Toastify shows error
            }
        } catch (error) {
            handleError("An error occurred. Please try again."); // ❌ Toastify error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="identifier"
                            placeholder="Enter Your email..."
                            value={loginInfo.identifier}
                            required
                            className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-purple-600"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter Your password..."
                            value={loginInfo.password}
                            required
                            className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-purple-600"
                        />
                    </div>

                    {/* Login Button */}
                    <button type="submit"
                        className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition duration-200">
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Don't have an account? <Link to="/signup" className="text-purple-700 hover:underline">Signup</Link>
                </p>
            </div>

            {/* Toastify Notifications */}
            <ToastContainer />
        </div>
    );
}

export default Login;
