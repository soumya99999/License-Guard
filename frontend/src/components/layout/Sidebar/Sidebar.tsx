// src/components/layout/sidebar/Sidebar.tsx
import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import SidebarToggle from './SidebarToggle';
import { sidebarItems } from './SidebarData';
import logo from '../../../assets/license_logo.png'; // Adjust the path as needed

interface SidebarProps {
  selectedSidebarItem: string;
  onSelectSidebarItem: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSidebarItem, onSelectSidebarItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col transition-all duration-300 z-40 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        {isExpanded && (
          <span className="ml-3 text-xl font-bold text-black dark:text-white">LicenseGuard</span>
        )}
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col gap-4">
        {sidebarItems.map((item, idx) => (
          <SidebarItem
            key={idx}
            icon={item.icon}
            label={item.label}
            isExpanded={isExpanded}
            isSelected={selectedSidebarItem === item.label}
            onClick={() => onSelectSidebarItem(item.label)}
          />
        ))}
      </div>

      {/* Toggle Button */}
      <SidebarToggle isExpanded={isExpanded} toggle={toggleSidebar} />
    </aside>
  );
};

export default Sidebar;
