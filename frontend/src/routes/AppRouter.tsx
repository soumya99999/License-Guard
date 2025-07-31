// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/admin/AdminDashboard';
import DeptHeadDashboard from '../pages/deptHead/DeptHeadDashboard';
import PrivateRoute from '../components/common/PrivateRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/dept-head/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login />} />

      {/* Dashboards */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dept-head/dashboard"
        element={
          <PrivateRoute allowedRoles={['DEPT_HEAD']}>
            <DeptHeadDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
