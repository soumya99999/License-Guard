// src/components/DeptHead/MemberList.tsx
import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { fetchApprovedUsers } from '../../services/userService';

interface Member {
  id: number;
  username: string;
  role: string;
}

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApprovedUsers = async () => {
      try {
        const approvedUsers = await fetchApprovedUsers();
        setMembers(approvedUsers);
      } catch (err) {
        console.error('Failed to fetch members:', err);
      } finally {
        setLoading(false);
      }
    };

    getApprovedUsers();
  }, []);

  return (
    <div className="mt-6 mx-6 p-5 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
        <FiUser className="mr-2" /> Department Members
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading members...</p>
      ) : members.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No approved users found.</p>
      ) : (
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex justify-between items-center p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <div className="flex items-center space-x-3">
                <FiUser />
                <span>{member.username}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
