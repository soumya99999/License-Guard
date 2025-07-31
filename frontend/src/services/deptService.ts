import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8081/api

// Fetch all departments
export const fetchAllDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};



export const fetchAllLicenseRequests = async () => {
  try{
    const response = await axios.get(`${API_BASE_URL}/license-requests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching license requests:', error);
    throw error;
  }
};

export const getDepartmentById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department with ID ${id}:`, error);
    throw error;
  }
};