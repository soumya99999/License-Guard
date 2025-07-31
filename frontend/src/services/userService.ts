import axios from 'axios';
import type { User } from '../types/User';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8081/api

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

