// src/components/user/Sidebar.tsx
import { FaBell, FaSignInAlt, FaUsers, FaLaptop, FaUser } from 'react-icons/fa';
import { useUserStore } from '../../store/userStore';

const Sidebar = ({ isExpanded, setShowDepartments }: { isExpanded: boolean; setShowDepartments: (val: boolean) => void }) => {
  const { user } = useUserStore();

  const items = [
    { label: 'License Request', icon: FaLaptop, onClick: () => setShowDepartments(false) },
    { label: 'Alerts', icon: FaBell, onClick: () => setShowDepartments(false) },
    { label: 'Join Department', icon: FaUsers, onClick: () => setShowDepartments(true) } // 👈 Show departments
  ];

  return (
    <div
      className={`h-full bg-white dark:bg-gray-900 transition-all duration-300 shadow-md flex flex-col justify-between ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="space-y-2 mt-6">
        {items.map(({ label, icon: Icon, onClick }) => (
          <div
            key={label}
            onClick={onClick}
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
          {user && user.role === 'USER' ? (
            <>
              <FaUser className="text-xl text-gray-800 dark:text-white" />
              <span
                className={`text-sm font-medium text-gray-800 dark:text-white transition-all duration-200 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                {user.username}
              </span>
              {!isExpanded && (
                <span className="sr-only">{user.username}</span>
              )}
            </>
          ) : (
            <>
              <FaSignInAlt className="text-xl text-gray-800 dark:text-white" />
              <span
                className={`text-sm font-medium text-gray-800 dark:text-white transition-all duration-200 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
