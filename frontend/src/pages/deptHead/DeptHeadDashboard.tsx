// src/pages/depthead/DeptHeadDashboard.tsx
import { useState } from 'react';
import DeptHeadNavbar from '../../components/DeptHead/DeptHeadNavbar';
import MemberList from '../../components/DeptHead/MemberList';
import LicenseRequestForm from '../../components/DeptHead/LicenseRequestForm';

const DeptHeadDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <DeptHeadNavbar toggleForm={() => setShowForm((prev) => !prev)} />
      {showForm ? <LicenseRequestForm onClose={() => setShowForm(false)} /> : <MemberList />}
    </div>
  );
};

export default DeptHeadDashboard;
