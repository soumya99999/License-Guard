import { useState, useEffect } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { fetchAllDepartments } from "../../services/deptService";
import { getAllReports, getReportsByDepartment } from "../../services/reportService";
import type { LicenseReport } from "../../types/reportTypes";

const ReportsAndAudit = () => {
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const depts = await fetchAllDepartments();
        setDepartments(depts);
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };
    loadDepartments();
  }, []);

  // Utility to convert LicenseReport array to CSV string
  const convertToCSV = (data: LicenseReport[]) => {
    if (!data || data.length === 0) return "";
    const keys = Object.keys(data[0]) as (keyof LicenseReport)[];
    const csvRows = [
      keys.join(","), // header row
      ...data.map(row =>
        keys
          .map(k => {
            const value = row[k];
            return `"${(value ?? "").toString().replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];
    return csvRows.join("\n");
  };

  // Utility to trigger file download in browser
  const triggerDownload = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOverallDownload = async () => {
    setLoading(true);
    try {
      const response = await getAllReports();
      // If response is an object with data array, extract it
      const reports = Array.isArray(response) ? response : response.data ?? [];
      const csv = convertToCSV(reports);
      triggerDownload(csv, "overall_report.csv");
    } catch (error) {
      console.error("Failed to download overall report:", error);
      alert("Failed to download overall report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeptDownload = async (deptId: number, deptName: string) => {
    setSelectedDeptId(deptId);
    setLoading(true);
    try {
      const response = await getReportsByDepartment(deptId);
      // If response is an object with data array, extract it
      const reports = Array.isArray(response) ? response : response.data ?? [];
      const csv = convertToCSV(reports);
      triggerDownload(csv, `${deptName.replace(/\s+/g, "_").toLowerCase()}_report.csv`);
    } catch (error) {
      console.error(`Failed to download report for department ${deptName}:`, error);
      alert(`Failed to download report for ${deptName}.`);
    } finally {
      setLoading(false);
      setSelectedDeptId(null);
    }
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
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
          >
            <FaCloudDownloadAlt className="w-5 h-5" />
            {loading ? "Downloading..." : "Download Overall Report"}
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
                key={dept.id}
                onClick={() => handleDeptDownload(dept.id, dept.name)}
                disabled={loading && selectedDeptId === dept.id}
                className={`${
                  selectedDeptId === dept.id
                    ? "bg-green-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-medium py-2 px-4 rounded-xl transition disabled:opacity-50`}
              >
                {loading && selectedDeptId === dept.id ? "Downloading..." : dept.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAudit;
