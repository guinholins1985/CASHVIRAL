
import React, { useState } from 'react';
import HomePage from './HomePage';
import EarnPage from './EarnPage';
import ProfilePage from './ProfilePage';
import { HomeIcon, DollarSignIcon, UserIcon, PlusIcon, WalletIcon } from '../../components/icons';

type Page = 'home' | 'earn' | 'profile' | 'add' | 'wallet';

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'earn':
        return <EarnPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  const NavItem: React.FC<{ page: Page; icon: React.ReactNode; label: string }> = ({ page, icon, label }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
        activePage === page ? 'text-white' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div className="h-screen w-screen bg-black text-white font-sans overflow-hidden">
      <main className="h-full w-full">{renderPage()}</main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-sm z-40">
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          <NavItem page="home" icon={<HomeIcon className="w-6 h-6" />} label="Início" />
          <NavItem page="earn" icon={<DollarSignIcon className="w-6 h-6" />} label="Ganhar" />
          <button onClick={() => alert('Add Video')} className="bg-white text-black rounded-lg w-12 h-8 flex items-center justify-center">
            <PlusIcon className="w-5 h-5"/>
          </button>
          <NavItem page="wallet" icon={<WalletIcon className="w-6 h-6" />} label="Carteira" />
          <NavItem page="profile" icon={<UserIcon className="w-6 h-6" />} label="Perfil" />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
