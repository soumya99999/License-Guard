import React from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to={`/${allowedRoles[0].toLowerCase()}/login`} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but role not authorized, redirect to login page
    return <Navigate to={`/${allowedRoles[0].toLowerCase()}/login`} replace />;
  }

  // Authorized, render children
  return <>{children}</>;
};

export default PrivateRoute;
