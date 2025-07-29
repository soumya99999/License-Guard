import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8081/api

// Accept a department join request by ID
export const acceptRequest = async (id: number) => {
  try {
    const response = await axios.put(API_BASE_URL + '/join-requests/' + id + '/approve');
    return response.data;
  } catch (error) {
    console.error('Error accepting join request:', error);
    throw error;
  }
};

// Reject a department join request by ID
export const rejectRequest = async (id: number) => {
  try {
    const response = await axios.put(API_BASE_URL + '/join-requests/' + id + '/reject');
    return response.data;
  } catch (error) {
    console.error('Error rejecting join request:', error);
    throw error;
  }
};

// Create a new department join request
export const sendJoinRequest = async (departmentId: number, userId: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/join-requests`, {
      departmentId,
      userId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending join request:', error);
    throw error;
  }
};

export const fetchJoinRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/join-requests`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching join requests:', error);
    throw error;
  }
};