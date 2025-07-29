// src/components/DeptHead/Navbar/UserJoinReqDropdown.tsx
import {useState } from 'react';
import { FiUsers, FiCheck, FiX } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useDeptRequestStore } from '../../store/deptRequestStore';

const UserJoinReqDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    joinRequests,
    loading,
    fetchJoinRequests,
    accept,
    reject,
  } = useDeptRequestStore();

  const toggleDropdown = async () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown) {
      await fetchJoinRequests();
    }
  };

  const pendingRequests = joinRequests.filter((req) => req.status === 'PENDING');

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
      >
        <FiUsers className="mr-2" />
        User Join Req
        <FaChevronDown className="ml-1 text-sm" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white dark:bg-gray-700 rounded shadow z-20">
          {loading ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-300">Loading...</div>
          ) : pendingRequests.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-300">
              No pending requests
            </div>
          ) : (
            pendingRequests.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => accept(user.id)}
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                    title="Accept"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => reject(user.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Reject"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserJoinReqDropdown;
