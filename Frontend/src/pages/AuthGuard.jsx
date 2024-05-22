import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const token = sessionStorage['token'];

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;