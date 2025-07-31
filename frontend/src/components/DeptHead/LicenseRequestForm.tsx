// src/components/DeptHead/LicenseRequestForm.tsx
import { useState } from 'react';
import { createDeptLicenseRequest } from '../../services/deptLicenseService';
import { useUserStore } from '../../store/userStore';

interface Props {
  onClose: () => void;
}

const softwareOptions = ['IntelliJ IDEA', 'VS Code', 'PyCharm', 'Postman'];

const LicenseRequestForm = ({ onClose }: Props) => {
  const { user } = useUserStore();
  const [softwareName, setSoftwareName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.departmentId || !user?.id) return alert('Department or User not found');

    try {
      setLoading(true);
      await createDeptLicenseRequest({
        softwareName,
        requestedQuantity: quantity,
        departmentId: user.departmentId,
        requestedByUserId: user.id,
      });
      alert('License request sent successfully');
      onClose();
    } catch (err) {
      console.error('Failed to send license request:', err);
      alert('Failed to send license request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 mx-6 p-5 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Request License
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Software
          </label>
          <select
            value={softwareName}
            onChange={(e) => setSoftwareName(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Software</option>
            {softwareOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LicenseRequestForm;
