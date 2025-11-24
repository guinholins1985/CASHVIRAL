
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './DashboardPage';
import UsersPage from './UsersPage';
import VideosPage from './VideosPage';
import RewardsPage from './RewardsPage';
import SettingsPage from './SettingsPage';

export type AdminPage = 'dashboard' | 'users' | 'videos' | 'rewards' | 'settings';

const AdminLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'users': return <UsersPage />;
      case 'videos': return <VideosPage />;
      case 'rewards': return <RewardsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header sidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
