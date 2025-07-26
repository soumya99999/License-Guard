// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white space-y-6">
      <h1 className="text-4xl font-bold">🔐 LicenseGuard</h1>
      <p className="text-lg">Choose your portal</p>
      <div className="space-x-4">
        <Link to="/admin" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Admin
        </Link>
        <Link to="/user" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          User
        </Link>
      </div>
    </div>
  );
};

export default Home;
