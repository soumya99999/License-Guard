// src/pages/admin/AdminDashboard.tsx
import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import Navbar from '../../components/layout/Navbar/Navbar';
import SectionWrapper from '../../components/sections/SectionWrapper';
import LicenseInventory from '../../components/features/LicenseInventory';
import LicenseAssignment from '../../components/features/LicenseAssignment';
import ReportsAndAudit from '../../components/features/ReportsAndAudit';

const AdminDashboard = () => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string>('License Inventory');

  const renderContent = () => {
    switch (selectedSidebarItem) {
      case 'License Inventory':
        return <LicenseInventory />;
      case 'License Assignment':
        return <LicenseAssignment/>;
      case 'Reports & Audit':
        return <ReportsAndAudit />;
      default:
        return <SectionWrapper />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedSidebarItem={selectedSidebarItem}
        onSelectSidebarItem={setSelectedSidebarItem}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Navbar */}
        <Navbar />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 dark:bg-gray-900 bg-cyan-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
