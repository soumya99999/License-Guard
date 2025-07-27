// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import ReportOptions from '../components/features/DownloadReport';
import SectionWrapper from '../components/sections/SectionWrapper';
// Update the import path and extension if the file exists as DownloadReport.tsx

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
      {/* Admin Dashboard Layout with Nested Routes */}
      <Route path="/admin/dashboard/*" element={<AdminDashboard />}>
        <Route path="reports" element={<ReportOptions />} />
        {/* Add more nested routes here if needed */}
      </Route>
      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default AppRouter;
