import axios from 'axios';
import type { DeptLicenseRequest } from '../types/DeptLicenseRequest';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllDeptLicenseRequests = async (): Promise<DeptLicenseRequest[]> => {
  const response = await axios.get<DeptLicenseRequest[]>(`${API_BASE_URL}/dept-license-requests`);
  return response.data;
};

interface CreateDeptLicenseRequestData {
  softwareName: string;
  requestedQuantity: number;
  departmentId: number;
  requestedByUserId: number;
}

export const createDeptLicenseRequest = async (
  data: CreateDeptLicenseRequestData
): Promise<DeptLicenseRequest> => {
  const response = await axios.post<DeptLicenseRequest>(`${API_BASE_URL}/dept-license-requests`, data);
  return response.data;
};
