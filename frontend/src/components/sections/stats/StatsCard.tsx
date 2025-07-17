// src/components/sections/stats/StatCard.tsx
import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  trend: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon: Icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex justify-between items-start">
      {/* Left side content */}
      <div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">{label}</div>
        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{trend}</div>
      </div>

      {/* Icon */}
      <div className={`p-2 rounded-md ${bgColor}`}>
        <Icon className={`text-lg ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatCard;
