import axios from 'axios';
import type { LoginResponse } from '../types/LoginResponse';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
  isApproved?: boolean;
  departmentId?: number | null;
}

const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  console.log(response.data);
  return response.data;
};

import type { User } from '../types/User';

const register = async (user: RegisterRequest): Promise<User> => {
  // Default role to USER and isApproved to false if not provided
  const userData = {
    ...user,
    role: user.role || 'USER',
    isApproved: user.isApproved !== undefined ? user.isApproved : false,
  };
  const response = await axios.post<User>(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export default {
  login,
  register,
};
