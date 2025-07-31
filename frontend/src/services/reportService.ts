import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Download overall report directly as file
export const downloadOverallReport = async (): Promise<Blob> => {
  const response = await axios.get(`${API_BASE_URL}/reports/licenses/download`, {
    responseType: 'blob', // ⬅️ this is key
  });
  return response.data;
};

// Download report for a specific department as file
export const downloadReportByDepartment = async (deptId: number): Promise<Blob> => {
  const response = await axios.get(`${API_BASE_URL}/reports/licenses/downloadByDepartment/${deptId}`, {
    responseType: 'blob',
  });
  return response.data;
};
