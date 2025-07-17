// src/components/layout/sidebar/SidebarToggle.tsx
import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

interface SidebarToggleProps {
    isExpanded: boolean;
    toggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isExpanded, toggle }) => {
    return (
        <div className="p-2 mt-auto  dark:hover:bg-gray-700 hover:bg-blue-600 rounded-md dark:text-white text-black  hover:text-white">
            <button onClick={toggle} className="flex items-center justify-center w-full hover:cursor-pointer">
                {isExpanded ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
            </button>
        </div>
    );
};

export default SidebarToggle;
