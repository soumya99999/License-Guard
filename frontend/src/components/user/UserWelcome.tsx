// src/components/user/UserWelcome.tsx
import { useEffect, useState } from 'react';
import { fetchAllDepartments } from '../../services/deptService';
import { sendJoinRequest} from '../../services/deptRequestService';
import { useUserStore } from '../../store/userStore';
import { useRequestStore } from '../../store/userRequestStore';
import type { User } from '../../types/User';
import type { Department } from '../../types/Department';
import type { LicenseRequestDTO } from '../../types/LicenseRequest';
import { sendLicenseRequest } from '../../services/userService';


interface Props {
  showDepartments: boolean;
}

const SOFTWARE_OPTIONS = ['IntelliJ IDEA', 'VS Code', 'Eclipse', 'PyCharm'];
const SYSTEM_IDS = ['SYS-001', 'SYS-002', 'SYS-003', 'SYS-004'];

const UserWelcome = ({ showDepartments }: Props) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [softwareName, setSoftwareName] = useState('');
  const [systemId, setSystemId] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const user: User | null = useUserStore((state) => state.user);

  const {
    sentRequests,
    addSentRequest,
    hasSentRequest,
    setInitialRequests,
  } = useRequestStore();

  useEffect(() => {
    if (showDepartments) {
      fetchAllDepartments()
        .then(setDepartments)
        .catch((err) => console.error(err));

      const savedRequests = localStorage.getItem('sentRequests');
      if (savedRequests) {
        const ids = JSON.parse(savedRequests) as number[];
        setInitialRequests(ids);
      }
    }
  }, [showDepartments, setInitialRequests]);

  const handleJoinRequest = async (deptId: number) => {
    if (!user?.id) return;
    setLoadingId(deptId);
    try {
      await sendJoinRequest(deptId, user.id);
      addSentRequest(deptId);
      localStorage.setItem(
        'sentRequests',
        JSON.stringify([...sentRequests, deptId])
      );
    } catch (err) {
      console.error(err);
      alert('Failed to send join request.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleLicenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!softwareName || !systemId || !user?.id) return;
    setSubmitLoading(true);
    try {
      const payload: LicenseRequestDTO = {
        softwareName,
        systemId,
        userId: user.id,
      };
      await sendLicenseRequest(payload);
      alert('License request submitted successfully!');
      setSoftwareName('');
      setSystemId('');
    } catch (err) {
      console.error('License request failed:', err);
      alert('Failed to submit license request.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (showDepartments) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Available Departments
        </h2>
        <ul className="space-y-4">
          {departments.map((dept) => {
            const isSent = hasSentRequest(dept.id);
            const isLoading = loadingId === dept.id;

            return (
              <li
                key={dept.id}
                className="flex justify-between items-center p-4 border rounded dark:border-gray-600"
              >
                <span className="text-gray-800 dark:text-white font-medium">
                  {dept.name}
                </span>
                <button
                  disabled={isLoading || isSent}
                  onClick={() => handleJoinRequest(dept.id)}
                  className={`px-4 py-1 rounded transition cursor-pointer ${
                    isSent
                      ? 'bg-green-500 text-white cursor-default'
                      : isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSent ? 'Sent' : isLoading ? 'Requesting...' : 'Join Request'}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // License request form view
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        🧾 License Request Form
      </h2>
      <form onSubmit={handleLicenseSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Software Name</label>
          <select
            className="w-full px-4 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={softwareName}
            onChange={(e) => setSoftwareName(e.target.value)}
            required
          >
            <option value="">Select software</option>
            {SOFTWARE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">System ID</label>
          <select
            className="w-full px-4 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={systemId}
            onChange={(e) => setSystemId(e.target.value)}
            required
          >
            <option value="">Select system</option>
            {SYSTEM_IDS.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {submitLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default UserWelcome;
