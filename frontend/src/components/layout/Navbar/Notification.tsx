// src/components/layout/navbar/Notification.tsx

import { FaBell } from 'react-icons/fa';

const Notification = () => {
  return (
    <button className="relative text-black dark:text-white">
      <FaBell className="text-xl" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
    </button>
  );
};

export default Notification;
