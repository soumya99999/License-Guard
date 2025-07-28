// src/pages/admin/AdminDashboard.tsx
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import Navbar from '../../components/layout/Navbar/Navbar';
import SectionWrapper from '../../components/sections/SectionWrapper';
import LicenseForm from '../../components/features/LicenseForm';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarSelect = (label: string) => {
  switch (label) {
    case 'License Inventory':
      navigate('/admin/dashboard/inventory');
      break;
    case 'Expiry & Renewal':
      navigate('/admin/dashboard/expiry');
      break;
    case 'License Management':
      navigate('/admin/dashboard/management');
      break;
    case 'Procurement':
      navigate('/admin/dashboard/procurement');
      break;
    case 'Reports & Audit':
      navigate('/admin/dashboard/reports');
      break;
    default:
      break;
  }
};


  const selectedSidebarItem = (() => {
  if (location.pathname.includes('/dashboard/inventory')) return 'License Inventory';
  if (location.pathname.includes('/dashboard/expiry')) return 'Expiry & Renewal';
  if (location.pathname.includes('/dashboard/management')) return 'License Management';
  if (location.pathname.includes('/dashboard/procurement')) return 'Procurement';
  if (location.pathname.includes('/dashboard/reports')) return 'Reports & Audit';
  return '';
})();


  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedSidebarItem={selectedSidebarItem}
        onSelectSidebarItem={handleSidebarSelect}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Scrollable Content */}
        {selectedSidebarItem === 'License Inventory' ? (
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 dark:bg-gray-900 bg-cyan-50">
            <LicenseForm />
          </div>

        ): selectedSidebarItem === 'Reports & Audit' ? (
      <SectionWrapper
        showHero={false}
        showStats={false}
        showReports={true}
        showFooter={true}
      />) 
        : (
          <SectionWrapper />
        )}
      </div>
  
    </div>
  );
};

export default AdminDashboard;
