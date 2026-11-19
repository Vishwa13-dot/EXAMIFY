import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * AdminRoute component guards admin-only routes.
 * Redirects non-admin users to /login or /dashboard.
 */
const AdminRoute = ({ currentUser, children }) => {
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ message: 'Admin login required to access Admin Console.' }} replace />;
  }

  if (currentUser.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
