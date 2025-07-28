import React, { useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDownload } from "react-icons/md";




const departments: string[] = [
  "IT Department",
  "HR Department",
  "Testing Department",
  "Management Department",
  "Electronics Department",
];

export default function ReportOptions() {
  const [selectedDept, setSelectedDept] = useState<string>("");

  const handleOverallDownload = (): void => {
    alert("Downloading overall report...");
  };

  const handleDeptDownload = (dept: string): void => {
    setSelectedDept(dept);
    alert(`Downloading report for ${dept}...`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-blue-100 rounded-2xl shadow-xl p-10 w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 flex justify-center items-center gap-2">
          <FaRegBuilding className="w-6 h-6 text-blue-600" />
          Reports Dashboard
        </h1>

        {/* Overall Report */}
        <div className="flex justify-center">
          <button
            onClick={handleOverallDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <FaCloudDownloadAlt className="w-5 h-5" />
            Download Overall Report
          </button>
        </div>

        {/* Department-wise */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Download Department-wise Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <button 
                key={dept}
                onClick={() => handleDeptDownload(dept)}
                className={`${
                  selectedDept === dept
                    ? "bg-green-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-medium py-2 px-4 rounded-xl transition`}
              >
                

                {dept}
                  
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
