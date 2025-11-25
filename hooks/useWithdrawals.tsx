import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { WithdrawalRequest } from '../types';
import { mockWithdrawalRequests } from '../data/mockData';

interface WithdrawalsContextType {
  requests: WithdrawalRequest[];
  updateRequestStatus: (requestId: string, status: 'approved' | 'rejected') => void;
}

const WithdrawalsContext = createContext<WithdrawalsContextType | undefined>(undefined);

const initializeWithdrawals = (): WithdrawalRequest[] => {
  try {
    const stored = localStorage.getItem('cashviral_withdrawals');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse withdrawals from localStorage", error);
  }
  localStorage.setItem('cashviral_withdrawals', JSON.stringify(mockWithdrawalRequests));
  return mockWithdrawalRequests;
};

export const WithdrawalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<WithdrawalRequest[]>(initializeWithdrawals);

  const updateRequestStatus = useCallback((requestId: string, status: 'approved' | 'rejected') => {
    setRequests(prevRequests => {
      const newRequests = prevRequests.map(r => r.id === requestId ? { ...r, status } : r);
      localStorage.setItem('cashviral_withdrawals', JSON.stringify(newRequests));
      return newRequests;
    });
  }, []);

  return (
    <WithdrawalsContext.Provider value={{ requests, updateRequestStatus }}>
      {children}
    </WithdrawalsContext.Provider>
  );
};

export const useWithdrawals = (): WithdrawalsContextType => {
  const context = useContext(WithdrawalsContext);
  if (context === undefined) {
    throw new Error('useWithdrawals must be used within a WithdrawalsProvider');
  }
  return context;
};
