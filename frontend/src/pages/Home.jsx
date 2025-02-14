import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ setAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Home</h1>
        <button 
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
