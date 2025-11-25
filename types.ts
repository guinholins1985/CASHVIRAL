

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string; // Made optional for security reasons, won't always be exposed
  avatar: string;
  balance: number;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  isAdmin?: boolean;
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

// Settings Page Types
export type AdPosition = 'home_top_banner' | 'video_feed_interstitial' | 'earn_page_banner' | 'profile_banner' | 'popup';

export interface Ad {
  id: number;
  position: AdPosition;
  code: string;
  enabled: boolean;
}

export interface Settings {
  general: {
    appName: string;
    appLogo: string | null;
    privacyPolicyUrl: string;
  };
  rewards: {
    rewardPerVideo: number;
    minWatchTime: number;
    dailyLoginBonus: number;
    inviteBonus: number;
    minWithdrawal: number;
    dailyWithdrawalLimit: number;
  };
  monetization: {
    paymentGateways: {
      mercadoPago: { enabled: boolean; apiKey: string };
      pagBank: { enabled: boolean; apiKey: string };
      stripe: { enabled: boolean; apiKey: string };
      paypal: { enabled: boolean; apiKey: string };
    };
    adsense: {
      enabled: boolean;
      publisherId: string;
    };
    customAds: Ad[];
  };
  api: {
    youtubeApiKey: string;
    geminiApiKey: string;

  };
  security: {
    maintenanceMode: {
      enabled: boolean;
      message: string;
    };
    admin2FA: boolean;
  };
}