import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Settings } from '../types';
import { mockSettings } from '../data/mockData';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const initializeSettings = (): Settings => {
    try {
        const storedSettings = localStorage.getItem('cashviral_settings');
        if (storedSettings) {
            return JSON.parse(storedSettings);
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
    // If nothing in localStorage or parsing fails, use initial mock data and save it
    localStorage.setItem('cashviral_settings', JSON.stringify(mockSettings));
    return mockSettings;
};


let globalSettings = initializeSettings();

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(globalSettings);

  const updateSettings = useCallback((newSettings: Settings) => {
    // Save to the persistent store (localStorage)
    localStorage.setItem('cashviral_settings', JSON.stringify(newSettings));
    // Update the in-memory copy
    globalSettings = JSON.parse(JSON.stringify(newSettings));
    // Update the React state to trigger re-renders
    setSettings(globalSettings);
    console.log("Global settings updated and saved:", globalSettings);
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