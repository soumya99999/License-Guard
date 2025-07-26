import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await authService.register({ username, email, password });
      navigate('/user/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Registration failed');
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">📝 User Registration</h2>
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
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Buttons Row */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition hover:cursor-pointer"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/user/login')}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
