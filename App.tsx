import React, { useState } from 'react';
import MainLayout from './pages/main/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import LandingPage from './pages/main/LandingPage';
import { ThemeProvider } from './hooks/useTheme';

type AppView = 'main' | 'admin';

const App: React.FC = () => {
  const [appEntered, setAppEntered] = useState(false);
  const [view, setView] = useState<AppView>('main');

  const switchToAdmin = () => setView('admin');
  const switchToMain = () => setView('main');
  
  if (!appEntered) {
    return (
       <ThemeProvider>
        <LandingPage onEnter={() => setAppEntered(true)} />
       </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="relative">
        {view === 'main' && <MainLayout />}
        {view === 'admin' && <AdminLayout />}

        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={view === 'main' ? switchToAdmin : switchToMain}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            {view === 'main' ? 'Admin Panel' : 'User View'}
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;