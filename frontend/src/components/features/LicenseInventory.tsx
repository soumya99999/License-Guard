import React, { useEffect, useState } from 'react';
import type { ProcurementRecord } from '../../types/ProcurementRecord';
import type { LicenseInventoryDTO } from '../../types/LicenseInventoryDTO';
import { fetchAllProcurements } from '../../services/procurementService';
import { createLicense, getLicensesByProcurementId } from '../../services/LicenseService';

const LicenseInventory: React.FC = () => {
  const [procurements, setProcurements] = useState<ProcurementRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [licenseCreatedMap, setLicenseCreatedMap] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');


  const [formData, setFormData] = useState<LicenseInventoryDTO>({
    softwareName: '',
    licenseKey: '',
    purchaseDate: '',
    expiryDate: '',
    totalQuantity: 0,
    departmentId: 0,
    procurementRecordId: 0,
  });

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const loadProcurementsAndLicenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const procs = await fetchAllProcurements();
      setProcurements(procs);

      const licenseStatusMap: Record<number, boolean> = {};
      await Promise.all(
        procs.map(async (proc) => {
          try {
            const licenses = await getLicensesByProcurementId(proc.poHeaderId);
            licenseStatusMap[proc.poHeaderId] = licenses.length > 0;
          } catch {
            licenseStatusMap[proc.poHeaderId] = false;
          }
        })
      );
      setLicenseCreatedMap(licenseStatusMap);
      setLoading(false);
    } catch {
      setError('Failed to load procurement records.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProcurementsAndLicenses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'totalQuantity' || name === 'departmentId' || name === 'procurementRecordId'
          ? Number(value)
          : value,
    }));
  };

  const handleCreateClick = (index: number) => {
    const proc = procurements[index];
    setFormData({
      softwareName: proc.softwareName || '',
      licenseKey: '',
      purchaseDate: proc.purchaseDate || '',
      expiryDate: '',
      totalQuantity: proc.quantity,
      departmentId: proc.departmentId,
      procurementRecordId: proc.poHeaderId,
    });
    setFormErrors(null);
    setFormSuccess(null);
    setFormSubmitting(false);
    setViewMode('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);
    setFormSuccess(null);

    if (
      !formData.softwareName ||
      !formData.licenseKey ||
      !formData.purchaseDate ||
      !formData.expiryDate ||
      !formData.totalQuantity
    ) {
      setFormErrors('Please fill in all required fields.');
      return;
    }

    setFormSubmitting(true);
    try {
      await createLicense(formData);
      setFormSuccess('License created successfully.');
      await loadProcurementsAndLicenses();
      setViewMode('list');
      setFormSubmitting(false);
    } catch {
      setFormErrors('Failed to create license.');
      setFormSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormErrors(null);
    setFormSuccess(null);
    setFormSubmitting(false);
    setViewMode('list');
  };

  if (loading) return <p>Loading procurement records...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (viewMode === 'list') {
    if (procurements.length === 0) return <p>No procurement records found.</p>;

    return (
      <div className="p-6">
        <h1 className="text-2xl dark:text-white text-black font-bold mb-4">Create Licenses for Procurement Records</h1>
        {procurements.map((proc, index) => (
          <div key={proc.poHeaderId} className="mb-8 p-4 border border-gray-300 rounded dark:text-white text-black">
            <h2 className="text-lg font-semibold mb-2">Order Number: {proc.orderNumber}</h2>
            <p>Software Name: {proc.softwareName}</p>
            <p>Quantity: {proc.quantity}</p>
            {licenseCreatedMap[proc.poHeaderId] ? (
              <p className="text-green-600 font-semibold mt-2">License Created</p>
            ) : (
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleCreateClick(index)}
              >
                Create License
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl dark:text-white text-black font-bold mb-4">Create License</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-4 border-gray-700 dark:border-gray-300 rounded dark:text-white text-black max-w-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="softwareName" className="block font-medium">Software Name</label>
            <input
              type="text"
              id="softwareName"
              name="softwareName"
              value={formData.softwareName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="licenseKey" className="block font-medium">License Key</label>
            <input
              type="text"
              id="licenseKey"
              name="licenseKey"
              value={formData.licenseKey}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="purchaseDate" className="block font-medium">Purchase Date</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate?.split('T')[0] || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block font-medium">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate?.split('T')[0] || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="totalQuantity" className="block font-medium">Total Quantity</label>
            <input
              type="number"
              id="totalQuantity"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={1}
              required
            />
          </div>

          {/* Hidden Fields */}
          <input type="hidden" name="departmentId" value={formData.departmentId} />
          <input type="hidden" name="procurementRecordId" value={formData.procurementRecordId} />

          {formErrors && <p className="text-red-600">{formErrors}</p>}
          {formSuccess && <p className="text-green-600">{formSuccess}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              disabled={formSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={formSubmitting}
            >
              {formSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LicenseInventory;
