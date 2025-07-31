// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white space-y-6">
      <h1 className="text-4xl font-bold">🔐 LicenseGuard</h1>
      <p className="text-lg">Choose your portal</p>
      <div className="space-x-4">
        <Link to="/admin/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Admin
        </Link>
        <Link to="/dept-head/login" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Department Head
        </Link>
      </div>
    </div>
  );
};

export default Home;
