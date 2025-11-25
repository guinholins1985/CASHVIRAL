import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, username: string, email: string, password: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be a real user state management, not a mutable global
let usersDB = [...mockUsers];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
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
    const user = usersDB.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userToStore } = user; // Don't store password
      setCurrentUser(userToStore);
      return userToStore;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = async (name: string, username: string, email: string, password: string): Promise<User | null> => {
    if (usersDB.some(u => u.username === username || u.email === email)) {
        return null; // User already exists
    }
    const newUser: User = {
        id: `u${usersDB.length + 1}`,
        name,
        username,
        email,
        password,
        avatar: `https://picsum.photos/seed/${username}/100`,
        balance: 0,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        isAdmin: false
    };
    usersDB.push(newUser);
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
