import React, { useEffect, useState } from 'react';
import { getAllDeptLicenseRequests } from '../../services/deptLicenseService';
import { assignLicense } from '../../services/assignService';
import { getAllLicenses } from '../../services/LicenseService';

import type { DeptLicenseRequest } from '../../types/DeptLicenseRequest';
import type { AssignLicenseData } from '../../types/AssignLicenseData';
import type { LicenseInventoryDTO } from '../../types/LicenseInventoryDTO';

const LicenseAssignment: React.FC = () => {
  const [requests, setRequests] = useState<DeptLicenseRequest[]>([]);
  const [inventories, setInventories] = useState<LicenseInventoryDTO[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DeptLicenseRequest | null>(null);
  const [formData, setFormData] = useState<AssignLicenseData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
    fetchInventories();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getAllDeptLicenseRequests();
      setRequests(data);
    } catch {
      setError('Failed to fetch department license requests.');
    }
  };

  const fetchInventories = async () => {
    try {
      const data = await getAllLicenses();
      setInventories(data);
    } catch {
      setError('Failed to fetch license inventories.');
    }
  };

  const handleAssignClick = (request: DeptLicenseRequest) => {
    const matchingInventories = inventories.filter(
      (inv) => inv.softwareName === request.softwareName
    );

    const selectedInventoryId = matchingInventories.length === 1 ? matchingInventories[0].id : 0;

    setSelectedRequest(request);
    setFormData({
      id: 0,
      licenseInventoryId: selectedInventoryId,
      departmentId: request.departmentId, // used in backend but hidden in UI
      assignedQuantity: request.requestedQuantity,
      expiresAt: '',
      softwareName: request.softwareName,
      deptLicenseRequestId: request.id,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'assignedQuantity' || name === 'licenseInventoryId'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || formData.licenseInventoryId === 0) {
      setError('Please select a valid license inventory.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await assignLicense(formData);
      setSuccessMessage('License assigned successfully.');
      setSelectedRequest(null);
      setFormData(null);
      fetchRequests(); // Refresh the list
    } catch {
      setError('Failed to assign license.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Department License Requests</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between"
          >
            <div>
              <p><strong>Software:</strong> {request.softwareName}</p>
              <p><strong>Requested Quantity:</strong> {request.requestedQuantity}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>

            {request.status === 'APPROVED' ? (
              <button
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded cursor-not-allowed"
                disabled
              >
                Assigned
              </button>
            ) : (
              <button
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleAssignClick(request)}
              >
                Assign
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Assignment Form */}
      {selectedRequest && formData && (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded bg-gray-100 shadow-md">
          <h3 className="text-lg font-bold mb-4">
            Assign License for {selectedRequest.softwareName}
          </h3>

          <div className="mb-3">
            <label className="block font-medium">License Inventory:</label>
            <select
              name="licenseInventoryId"
              value={formData.licenseInventoryId}
              onChange={handleInputChange}
              required
              className="w-full border px-2 py-1 rounded"
            >
              <option value={0}>-- Select Inventory --</option>
              {inventories
                .filter((inv) => inv.softwareName === selectedRequest.softwareName)
                .map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    ID: {inv.id} | Available: {inv.availableQuantity}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block font-medium">Assigned Quantity:</label>
            <input
              type="number"
              name="assignedQuantity"
              value={formData.assignedQuantity}
              min={1}
              onChange={handleInputChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Expiry Date:</label>
            <input
              type="date"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleInputChange}
              required
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {submitting ? 'Assigning...' : 'Assign License'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRequest(null);
                setFormData(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LicenseAssignment;
