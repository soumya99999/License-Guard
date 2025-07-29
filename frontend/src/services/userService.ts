import axios from 'axios';
import type { User } from '../types/User';
import type { LicenseRequestDTO } from '../types/LicenseRequest';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8081/api

// 1. Request to Join Department
export const joinDepartment = async (userId: number, departmentId: number) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, {
      departmentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error while joining department:', error);
    throw error;
  }
};

// 3. Get All Users with Role "USER"
export const fetchApprovedUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    const allUsers = response.data;
    console.log(allUsers);

    return allUsers.filter(
      (user: User) => user.role === 'USER' && user.isApproved === true
    );
  } catch (error) {
    console.error('Error while fetching approved users:', error);
    throw error;
  }
};

export const sendLicenseRequest = async (data: LicenseRequestDTO): Promise<LicenseRequestDTO> => {
  const response = await axios.post(`${API_BASE_URL}/license-requests`, data);
  return response.data;
};