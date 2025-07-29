import React, { useEffect, useState } from 'react';
import { fetchDeptLicenseRequests } from '../../services/deptLicenseService';
import { assignLicense} from '../../services/assignService';
import type { AssignLicenseData } from '../../types/AssignLicenseData';
import type { DeptLicenseRequestDTO } from '../../types/DeptLicenseRequest';

const LicenseAssignment: React.FC = () => {
  const [requests, setRequests] = useState<DeptLicenseRequestDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assigningRequest, setAssigningRequest] = useState<DeptLicenseRequestDTO | null>(null);
  const [formData, setFormData] = useState<AssignLicenseData>({
    licenseInventoryId: 0,
    assignedToUserId: 0,
    assignedByUserId: 0,
    assignedQuantity: 0,
    expiresAt: '',
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDeptLicenseRequests();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching license requests:', err);
      setError('Failed to load license requests.');
    } finally {
      setLoading(false);
    }
  };

  const openAssignForm = (request: DeptLicenseRequestDTO) => {
    setAssigningRequest(request);
    setFormData({
      licenseInventoryId: 0,
      assignedToUserId: request.requestedByUserId || 0,
      assignedByUserId: 0,
      assignedQuantity: request.requestedQuantity,
      expiresAt: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'assignedQuantity' || name === 'licenseInventoryId' || name === 'assignedToUserId' || name === 'assignedByUserId'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningRequest) return;

    try {
      await assignLicense(formData);
      // Update the status of the particular request from PENDING to APPROVED
      setRequests(prev =>
        prev.map(req =>
          req.id === assigningRequest.id ? { ...req, status: 'APPROVED' } : req
        )
      );
      setAssigningRequest(null);
    } catch (err) {
      console.error('Error assigning license:', err);
      setError('Failed to assign license.');
    }
  };

  const handleCancel = () => {
    setAssigningRequest(null);
    setError(null);
  };

  if (loading) {
    return <div className="p-6">Loading license requests...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (assigningRequest) {
    return (
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Assign License</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="licenseInventoryId" className="block font-medium">License Inventory ID</label>
            <input
              type="number"
              id="licenseInventoryId"
              name="licenseInventoryId"
              value={formData.licenseInventoryId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="assignedToUserId" className="block font-medium">Assigned To User ID</label>
            <input
              type="number"
              id="assignedToUserId"
              name="assignedToUserId"
              value={formData.assignedToUserId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="assignedByUserId" className="block font-medium">Assigned By User ID</label>
            <input
              type="number"
              id="assignedByUserId"
              name="assignedByUserId"
              value={formData.assignedByUserId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="assignedQuantity" className="block font-medium">Assigned Quantity</label>
            <input
              type="number"
              id="assignedQuantity"
              name="assignedQuantity"
              value={formData.assignedQuantity}
              onChange={handleInputChange}
              min={1}
              required
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="expiresAt" className="block font-medium">Expires At</label>
            <input
              type="date"
              id="expiresAt"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">License Management</h1>
      {requests.length === 0 ? (
        <p>No license requests found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Software Name</th>
              <th className="border border-gray-300 px-4 py-2">Requested Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{request.id}</td>
                <td className="border border-gray-300 px-4 py-2">{request.softwareName}</td>
                <td className="border border-gray-300 px-4 py-2">{request.requestedQuantity}</td>
                <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.status === 'PENDING' ? (
                    <button
                      onClick={() => openAssignForm(request)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Assign
                    </button>
                  ) : (
                    'Assigned'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LicenseAssignment;
