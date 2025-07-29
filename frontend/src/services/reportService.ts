import axios from 'axios';
import type { LicenseReport } from '../types/reportTypes';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get all license reports (for Admin)
export const getAllReports = async (): Promise<LicenseReport[]> => {
  const response = await axios.get(`${API_BASE_URL}/reports/licenses/download`);
  return response.data;
};

// Get license reports by department (for Dept Head)
export const getReportsByDepartment = async (deptId: number): Promise<LicenseReport[]> => {
  const response = await axios.get(`${API_BASE_URL}/reports/licenses/downloadByDepartment/${deptId}`);
  return response.data;
};
