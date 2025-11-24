import { User, Video, Transaction, DailyTask, WithdrawalRequest } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', avatar: 'https://picsum.photos/seed/alice/100', balance: 125.50, status: 'active', joinDate: '2023-10-01' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', avatar: 'https://picsum.photos/seed/bob/100', balance: 78.20, status: 'active', joinDate: '2023-10-05' },
  { id: 'u3', name: 'Charlie', email: 'charlie@example.com', avatar: 'https://picsum.photos/seed/charlie/100', balance: 0, status: 'banned', joinDate: '2023-10-10' },
  { id: 'u4', name: 'Diana', email: 'diana@example.com', avatar: 'https://picsum.photos/seed/diana/100', balance: 340.00, status: 'active', joinDate: '2023-10-12' },
  { id: 'u5', name: 'Eve', email: 'eve@example.com', avatar: 'https://picsum.photos/seed/eve/100', balance: 15.75, status: 'inactive', joinDate: '2023-10-15' },
];

export const mockVideos: Video[] = [];


export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'earn', amount: 0.10, description: 'Watched "Awesome Video #1"', date: '2023-11-20T10:00:00Z' },
  { id: 't2', type: 'earn', amount: 0.10, description: 'Watched "Awesome Video #2"', date: '2023-11-20T10:05:00Z' },
  { id: 't3', type: 'bonus', amount: 5.00, description: 'Daily login bonus', date: '2023-11-20T09:00:00Z' },
  { id: 't4', type: 'withdraw', amount: -20.00, description: 'Withdrawal via PIX', date: '2023-11-19T15:30:00Z', status: 'approved' },
  { id: 't5', type: 'earn', amount: 0.10, description: 'Watched "Awesome Video #3"', date: '2023-11-19T14:00:00Z' },
];

export const mockDailyTasks: DailyTask[] = [
  { id: 1, title: 'Watch 10 videos', description: 'Finish watching 10 videos today.', reward: 1.00, progress: 3, goal: 10, isCompleted: false },
  { id: 2, title: 'Like 5 videos', description: 'Show some love to creators.', reward: 0.50, progress: 5, goal: 5, isCompleted: true },
  { id: 3, title: 'Invite a friend', description: 'Share the fun and earn big.', reward: 10.00, progress: 0, goal: 1, isCompleted: false },
];

export const mockWithdrawalRequests: WithdrawalRequest[] = [
  { id: 'w1', userId: 'u1', userName: 'Alice', amount: 50.00, method: 'PIX', pixKey: 'alice@email.com', date: '2023-11-20T11:00:00Z', status: 'pending' },
  { id: 'w2', userId: 'u4', userName: 'Diana', amount: 100.00, method: 'PIX', pixKey: '123.456.789-00', date: '2023-11-19T18:00:00Z', status: 'approved' },
  { id: 'w3', userId: 'u2', userName: 'Bob', amount: 25.00, method: 'PagBank', pixKey: '(11) 98765-4321', date: '2023-11-18T12:00:00Z', status: 'rejected' },
];