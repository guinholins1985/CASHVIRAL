import React, { useState, useEffect } from 'react';
import MainLayout from './pages/main/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import LandingPage from './pages/main/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { SettingsProvider, useSettings } from './hooks/useSettings';
import { VideosProvider } from './hooks/useVideos';
import { UsersProvider } from './hooks/useUsers';
import { WithdrawalsProvider } from './hooks/useWithdrawals';

type AuthView = 'login' | 'register';

const AdSenseLoader: React.FC = () => {
  const { settings } = useSettings();
  const { enabled, publisherId } = settings.monetization.adsense;

  useEffect(() => {
    if (enabled && publisherId) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.id = 'adsense-script';

      // Avoid adding duplicate scripts
      if (!document.getElementById('adsense-script')) {
        document.head.appendChild(script);
      }
    }
  }, [enabled, publisherId]);

  return null; // This component doesn't render anything
};


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
        <AdSenseLoader />
        <UsersProvider>
          <AuthProvider>
            <VideosProvider>
              <WithdrawalsProvider>
                <AppContent />
              </WithdrawalsProvider>
            </VideosProvider>
          </AuthProvider>
        </UsersProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;