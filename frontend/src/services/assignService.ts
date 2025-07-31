import axios from 'axios';
import type { AssignLicenseData } from '../types/AssignLicenseData';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const assignLicense = async (data: AssignLicenseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/license-assignments`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error assigning license:', error);
    throw error;
  }
};
