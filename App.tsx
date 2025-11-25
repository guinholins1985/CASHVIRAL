import React, { useState } from 'react';
import MainLayout from './pages/main/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import LandingPage from './pages/main/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider } from './hooks/useSettings';

type AuthView = 'login' | 'register';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [landingPageSeen, setLandingPageSeen] = useState(false);

  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
  }

  if (isAdmin) {
    return <AdminLayout />;
  }
  
  if (!landingPageSeen) {
    return <LandingPage onEnter={() => setLandingPageSeen(true)} />;
  }

  return <MainLayout />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;