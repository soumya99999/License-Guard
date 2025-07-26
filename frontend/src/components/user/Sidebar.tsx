// src/components/user/Sidebar.tsx
import { FaBell, FaSignInAlt, FaUsers, FaLaptop } from 'react-icons/fa';

const items = [
  { label: 'License Request', icon: FaLaptop },
  { label: 'Alerts', icon: FaBell },
  { label: 'Join Department', icon: FaUsers }
];

const Sidebar = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div
      className={`h-full bg-white dark:bg-gray-900 transition-all duration-300 shadow-md flex flex-col justify-between ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="space-y-2 mt-6">
        {items.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2"
          >
            <Icon className="text-xl text-gray-800 dark:text-white" />
            <span
              className={`text-sm font-medium text-gray-800 dark:text-white transition-all duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6 mx-2">
        <div className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <FaSignInAlt className="text-xl text-gray-800 dark:text-white" />
          <span
            className={`text-sm font-medium text-gray-800 dark:text-white transition-all duration-200 ${
              isExpanded ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
