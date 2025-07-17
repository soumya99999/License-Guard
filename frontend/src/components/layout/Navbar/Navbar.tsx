// src/components/layout/navbar/Navbar.tsx

import SearchBar from './Searchbar';
import Notification from './Notification';
import ThemeToggle from './ThemeToggle';
import AuthSection from './AuthSection';

const Navbar = () => {
  return (
    <nav className="w-full h-16 sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between shadow-sm">
      <SearchBar />
      <div className="flex items-center gap-9">
        <Notification />
        <ThemeToggle />
        <AuthSection />
      </div>
    </nav>
  );
};

export default Navbar;
