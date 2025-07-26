// src/pages/auth/Login.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const roleFromPath = location.pathname.includes('admin')
    ? 'ADMIN'
    : location.pathname.includes('dept-head')
    ? 'DEPT_HEAD'
    : 'USER';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await authService.login(username, password);
      // Navigate based on role from response
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'DEPT_HEAD') navigate('/dept-head/dashboard');
      else navigate('/user/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">🔑 {roleFromPath} Login</h2>
        {error && (
          <div className="text-red-600 text-center mb-2">{error}</div>
        )}
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
