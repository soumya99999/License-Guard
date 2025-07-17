// src/components/forms/LicenseForm.tsx
import React, { useState } from 'react';
import { FaPlus, FaPaperPlane } from 'react-icons/fa';

interface LicenseFormData {
  licenseId: string;
  type: string;
  vendor: string;
  validityStart: string;
  validityEnd: string;
  purchaseDate: string;
  maxUsers: string;
  invoiceNumber: string;
}

const LicenseForm = () => {
  const [formData, setFormData] = useState<LicenseFormData>({
    licenseId: '',
    type: '',
    vendor: '',
    validityStart: '',
    validityEnd: '',
    purchaseDate: '',
    maxUsers: '',
    invoiceNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-8 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm space-y-6 transition-all duration-300"
      >
        <div className="flex items-center gap-3 justify-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          <h2>Add License to Inventory</h2>
        </div>

        {(
          [
            { label: 'License ID', name: 'licenseId' },
            { label: 'Type', name: 'type' },
            { label: 'Vendor', name: 'vendor' },
            { label: 'Validity Start', name: 'validityStart', type: 'date' },
            { label: 'Validity End', name: 'validityEnd', type: 'date' },
            { label: 'Purchase Date', name: 'purchaseDate', type: 'date' },
            { label: 'Max Users', name: 'maxUsers', type: 'number' },
            { label: 'Invoice Number', name: 'invoiceNumber' },
          ] as const
        ).map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-all duration-200 active:scale-95"
        >
          <FaPaperPlane />
          Submit
        </button>
      </form>
    </div>
  );
};

export default LicenseForm;
