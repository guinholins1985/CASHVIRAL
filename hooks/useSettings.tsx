import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Settings } from '../types';
import { mockSettings } from '../data/mockData';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// In a real app, this would be persisted to a backend or localStorage.
// For this simulation, we use a mutable global object to mimic persistence across re-renders.
let globalSettings = JSON.parse(JSON.stringify(mockSettings));

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(globalSettings);

  const updateSettings = useCallback((newSettings: Settings) => {
    // Simulate saving to a persistent store
    globalSettings = JSON.parse(JSON.stringify(newSettings));
    setSettings(globalSettings);
    console.log("Global settings updated:", globalSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
