// src/components/user/Header.tsx
import { FaSearch, FaSun, FaMoon, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface HeaderProps {
  toggleSidebar: () => void;
  isExpanded: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ toggleSidebar, isExpanded, toggleDarkMode }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-md dark:bg-gray-800 bg-white">
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full cursor-pointer">
          {isExpanded ? <FaArrowLeft className="text-lg" /> : <FaArrowRight className="text-lg" />}
        </button>
        {isExpanded && <span className="text-lg font-semibold dark:text-white text-gray-800">User Panel</span>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white text-black"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <FaSun className="text-yellow-500 dark:hidden" />
          <FaMoon className="text-white hidden dark:block" />
        </button>
      </div>
    </div>
  );
};

export default Header;
