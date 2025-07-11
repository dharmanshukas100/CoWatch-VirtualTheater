import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Check if the token exists

  useEffect(() => {
    if (!token) {
      navigate('/login');  // If not logged in, redirect to login
    }
  }, [token, navigate]);

  if (!token) {
    return null;  // Don't render anything while checking
  }

  return children;  // If logged in, render the protected component
};

export default ProtectedRoute;
