// src/components/sections/hero/HeroButtons.tsx
import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const HeroButtons = () => {
  return (
    <div className="flex gap-4">
      {/* View Reports Button */}
      <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition hover:cursor-pointer">
        <FaChartBar />
        View Reports
      </button>

      {/* Manage License Button */}
      <button className="px-5 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900 transition hover:cursor-pointer">
        Manage License
      </button>
    </div>
  );
};

export default HeroButtons;
