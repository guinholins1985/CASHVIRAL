
import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { SunIcon, MoonIcon, ChevronDownIcon } from '../../../components/icons';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 z-20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button
          className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img className="h-8 w-8 rounded-full" src="https://picsum.photos/seed/admin/100" alt="Admin" />
              <span className="hidden md:inline text-sm font-medium">Admin User</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {/* Dropdown can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
