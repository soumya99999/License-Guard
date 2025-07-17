// src/components/layout/sidebar/SidebarItem.tsx
import React from 'react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isExpanded: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isExpanded, isSelected = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 cursor-pointer rounded-md transition-colors duration-200 ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white'
      }`}
    >
      <Icon className="text-2xl" />
      {isExpanded && <span className="text-base font-semibold">{label}</span>}
    </div>
  );
};

export default SidebarItem;
