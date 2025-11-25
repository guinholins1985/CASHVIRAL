import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { useUsers } from './useUsers';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, username: string, email: string, password: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = sessionStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Could not parse user from session storage", e);
      return null;
    }
  });

  const { users, addUser } = useUsers();
  
  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.isAdmin || false;

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<User | null> => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userToStore } = user; // Don't store password in session
      setCurrentUser(userToStore);
      return userToStore;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = async (name: string, username: string, email: string, password: string): Promise<User | null> => {
    if (users.some(u => u.username === username || u.email === email)) {
        return null; // User already exists
    }
    const newUser: User = {
        id: `u${Date.now()}`,
        name,
        username,
        email,
        password,
        avatar: `https://i.pravatar.cc/150?u=${username}`,
        balance: 0,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        isAdmin: false
    };
    
    addUser(newUser);
    
    const { password: _, ...userToStore } = newUser;
    setCurrentUser(userToStore);
    return userToStore;
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
