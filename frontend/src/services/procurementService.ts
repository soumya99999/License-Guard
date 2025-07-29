import axios from 'axios';
import type { ProcurementRecord } from '../types/ProcurementRecord';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8080

export const fetchAllProcurements = async (): Promise<ProcurementRecord[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/procurements`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching procurement records:', error);
    throw error;
  }
};
