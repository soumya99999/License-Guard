// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/authService';
import type { LoginResponse } from '../../types/LoginResponse';
import type { User } from '../../types/User';
import { useUserStore } from '../../store/userStore';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response: LoginResponse = await authService.login(username, password);

      const user: User = {
        id: response.userId,
        username: response.username,
        role: response.role,
        isApproved: response.isApproved,
        departmentId: response.departmentId,
        departmentName: response?.departmentName,
      };

      setUser(user);

      // Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'DEPT_HEAD') {
        navigate('/dept-head/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setErrorMsg('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Login</h2>
        {errorMsg && <p className="text-sm text-red-600 text-center">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
