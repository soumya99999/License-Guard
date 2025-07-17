// src/App.tsx
import { useState } from 'react';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import SectionWrapper from './components/sections/SectionWrapper';
import LicenseForm from './components/features/LicenseForm';

const App = () => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string>('');

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
        {selectedSidebarItem === 'License Inventory' ? (
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 dark:bg-gray-900 bg-cyan-50">
            <LicenseForm />
          </div>
        ) : (
          <SectionWrapper />
        )}
      </div>
    </div>
  );
};

export default App;
