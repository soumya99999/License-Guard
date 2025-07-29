import axios from 'axios';
import type { DeptLicenseRequestDTO } from '../types/DeptLicenseRequest';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sendDeptLicenseRequest = async (request: {
  softwareName: string;
  requestedQuantity: number;
  email: string;
  departmentId: number;
}): Promise<DeptLicenseRequestDTO> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dept-license-requests`, request);
    return response.data;
  } catch (error) {
    console.error('Error sending department license request:', error);
    throw error;
  }
};

export const fetchDeptLicenseRequests = async (): Promise<DeptLicenseRequestDTO[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dept-license-requests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching department license requests:', error);
    throw error;
  }
};
