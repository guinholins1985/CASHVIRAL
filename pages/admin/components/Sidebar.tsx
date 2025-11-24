import React from 'react';
import { AdminPage } from '../AdminLayout';
import { LayoutDashboardIcon, UsersIcon, VideoIcon, GiftIcon, SettingsIcon } from '../../../components/icons';

interface SidebarProps {
  currentPage: AdminPage;
  setCurrentPage: (page: AdminPage) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  page: AdminPage;
  label: string;
  icon: React.ReactNode;
  currentPage: AdminPage;
  setCurrentPage: (page: AdminPage) => void;
  isSidebarOpen: boolean;
}> = ({ page, label, icon, currentPage, setCurrentPage, isSidebarOpen }) => {
  const isActive = currentPage === page;
  return (
    <li>
      <button
        onClick={() => setCurrentPage(page)}
        className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-primary-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        {icon}
        <span className={`ml-3 transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 shadow-xl transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <h1 className={`text-2xl font-bold text-primary-600 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>CASH<span className="text-gray-800 dark:text-white">VIRAL</span></h1>
      </div>
      <nav className="p-2">
        <ul>
          <NavItem
            page="dashboard"
            label="Dashboard"
            icon={<LayoutDashboardIcon className="w-6 h-6 flex-shrink-0" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isSidebarOpen={isOpen}
          />
          <NavItem
            page="users"
            label="Usuários"
            icon={<UsersIcon className="w-6 h-6 flex-shrink-0" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isSidebarOpen={isOpen}
          />
           <NavItem
            page="videos"
            label="Vídeos"
            icon={<VideoIcon className="w-6 h-6 flex-shrink-0" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isSidebarOpen={isOpen}
          />
          <NavItem
            page="rewards"
            label="Recompensas"
            icon={<GiftIcon className="w-6 h-6 flex-shrink-0" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isSidebarOpen={isOpen}
          />
          <NavItem
            page="settings"
            label="Configurações"
            icon={<SettingsIcon className="w-6 h-6 flex-shrink-0" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isSidebarOpen={isOpen}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;