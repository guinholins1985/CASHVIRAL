import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface UsersContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUserStatus: (userId: string, status: User['status']) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

const initializeUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('cashviral_users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (error) {
    console.error("Failed to parse users from localStorage", error);
  }
  localStorage.setItem('cashviral_users', JSON.stringify(mockUsers));
  return mockUsers;
};

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initializeUsers);

  const persistUsers = (updatedUsers: User[]) => {
    localStorage.setItem('cashviral_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const addUser = useCallback((user: User) => {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers, user];
      localStorage.setItem('cashviral_users', JSON.stringify(newUsers));
      return newUsers;
    });
  }, []);

  const updateUserStatus = useCallback((userId: string, status: User['status']) => {
    setUsers(prevUsers => {
      const newUsers = prevUsers.map(u => u.id === userId ? { ...u, status } : u);
      localStorage.setItem('cashviral_users', JSON.stringify(newUsers));
      return newUsers;
    });
  }, []);

  return (
    <UsersContext.Provider value={{ users, addUser, updateUserStatus }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
