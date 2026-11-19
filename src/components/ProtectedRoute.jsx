import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute component to guard student-only routes.
 * If user is logged in, renders children; otherwise redirects to /login.
 * Frontend authentication state is passed as a prop from App.jsx.
 */
const ProtectedRoute = ({ currentUser, children }) => {
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login with notice in state
    return <Navigate to="/login" state={{ from: location, message: 'Please log in to access the examination system.' }} replace />;
  }

  return children;
};

export default ProtectedRoute;
