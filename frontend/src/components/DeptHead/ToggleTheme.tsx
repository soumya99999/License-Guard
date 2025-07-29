// src/components/DeptHead/Navbar/ToggleTheme.tsx
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ToggleTheme;
