// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';

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
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default AppRouter;
