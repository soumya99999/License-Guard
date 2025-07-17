// src/components/sections/stats/statsData.ts
import { FaBox, FaCalendarAlt, FaExclamationTriangle, FaUsers } from 'react-icons/fa';

export const statsData = [
  {
    label: 'Active Licenses',
    value: 1243,
    trend: '+12%',
    icon: FaBox,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    label: 'Expiring Soon',
    value: 87,
    trend: '21 this month',
    icon: FaCalendarAlt,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    label: 'Expired',
    value: 45,
    trend: '13 this month',
    icon: FaExclamationTriangle,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    label: 'Assigned',
    value: 937,
    trend: '+8%',
    icon: FaUsers,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
];
