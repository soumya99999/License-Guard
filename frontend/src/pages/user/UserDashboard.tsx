// src/pages/user/UserDashboard.tsx
import { useState, useEffect } from 'react';
import Sidebar from '../../components/user/Sidebar';
import Header from '../../components/user/Header';
import UserWelcome from '../../components/user/UserWelcome';

const UserDashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className="flex h-screen bg-cyan-50 dark:bg-gray-900">
      <Sidebar isExpanded={isExpanded} />
      <div className="flex-1 flex flex-col">
        <Header
          toggleSidebar={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <UserWelcome />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
