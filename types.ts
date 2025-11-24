
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: number;
  likes: number;
  uploader: string;
  uploaderAvatar: string;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'withdraw' | 'bonus';
  amount: number;
  description: string;
  date: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface DailyTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  goal: number;
  isCompleted: boolean;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  method: 'PIX' | 'PagBank';
  pixKey: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}
