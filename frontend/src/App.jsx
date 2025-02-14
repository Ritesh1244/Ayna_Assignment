import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/Login';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="home" element={<PrivateRoute element={<Home setAuthenticated={setAuthenticated} />} />} />
        <Route path="login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
