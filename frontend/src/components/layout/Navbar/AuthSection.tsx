// src/components/layout/navbar/AuthSection.tsx

import { useState, useRef, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import { FaUserShield, FaUser } from 'react-icons/fa';
const FrontendURL  = import.meta.env.VITE_FRONTEND_URL;

const AuthSection = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    clearUser();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-4" ref={dropdownRef}>
      {user ? (
        <>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {user.role === 'ADMIN' ? (
              <FaUserShield className="text-blue-600 text-xl" />
            ) : (
              <FaUser className="text-green-600 text-xl" />
            )}
            <span className="text-gray-800 dark:text-white font-medium">
              {user.username}
            </span>
          </div>

          {showDropdown && (
            <div className="absolute top-10 right-0 mt-1 w-32 bg-white dark:bg-gray-800 shadow-lg border rounded-md z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-red-400  text-left hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => (window.location.href = `${FrontendURL}/admin/login`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default AuthSection;
