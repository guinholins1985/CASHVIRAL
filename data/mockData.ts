import { User, Video, Transaction, DailyTask, WithdrawalRequest, Settings } from '../types';

export const mockUsers: User[] = [
  { id: 'u0', name: 'Admin User', username: 'ad', email: 'admin@cashviral.com', password: 'a12', avatar: 'https://i.pravatar.cc/150?u=admin', balance: 9999, status: 'active', joinDate: '2023-01-01', isAdmin: true },
  { id: 'u1', name: 'Alice', username: 'alice', email: 'alice@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?u=alice', balance: 125.50, status: 'active', joinDate: '2023-10-01' },
  { id: 'u2', name: 'Bob', username: 'bob', email: 'bob@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?u=bob', balance: 78.20, status: 'active', joinDate: '2023-10-05' },
  { id: 'u3', name: 'Charlie', username: 'charlie', email: 'charlie@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?u=charlie', balance: 0, status: 'banned', joinDate: '2023-10-10' },
  { id: 'u4', name: 'Diana', username: 'diana', email: 'diana@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?u=diana', balance: 340.00, status: 'active', joinDate: '2023-10-12' },
  { id: 'u5', name: 'Eve', username: 'eve', email: 'eve@example.com', password: 'password123', avatar: 'https://i.pravatar.cc/150?u=eve', balance: 15.75, status: 'inactive', joinDate: '2023-10-15' },
];

export const mockVideos: Video[] = [
    {
        id: 'v1',
        title: 'Big Buck Bunny tells about the story of a giant rabbit with a heart bigger than himself.',
        thumbnail: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '09:56',
        views: 1500000,
        likes: 85000,
        uploader: 'Blender Foundation',
        uploaderAvatar: 'https://i.pravatar.cc/150?u=blender',
    },
    {
        id: 'v2',
        title: 'The first Blender Open Movie from 2006',
        thumbnail: 'https://orange.blender.org/wp-content/themes/orange/images/media/gallery_screen01_s.jpg',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '10:53',
        views: 1200000,
        likes: 72000,
        uploader: 'Blender Foundation',
        uploaderAvatar: 'https://i.pravatar.cc/150?u=blender',
    },
    {
        id: 'v3',
        title: 'HBO GO now works with Chromecast',
        thumbnail: 'https://i.ytimg.com/vi/yZXEr-t-MR8/maxresdefault.jpg',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        duration: '00:15',
        views: 890000,
        likes: 45000,
        uploader: 'Google',
        uploaderAvatar: 'https://i.pravatar.cc/150?u=google',
    },
    {
        id: 'v4',
        title: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
        thumbnail: 'https://i.ytimg.com/vi/f2ar0ltTvaU/maxresdefault.jpg',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        duration: '01:00',
        views: 2100000,
        likes: 110000,
        uploader: 'Google',
        uploaderAvatar: 'https://i.pravatar.cc/150?u=google',
    }
];

export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'earn', amount: 0.10, description: 'Watched "Big Buck Bunny"', date: '2023-10-28T10:00:00Z' },
  { id: 't2', type: 'bonus', amount: 5.00, description: 'Bônus de Convite', date: '2023-10-28T11:30:00Z' },
  { id: 't3', type: 'withdraw', amount: -20.00, description: 'Saque via PIX', date: '2023-10-27T15:00:00Z', status: 'approved' },
  { id: 't4', type: 'earn', amount: 0.10, description: 'Watched "Elephants Dream"', date: '2023-10-26T09:00:00Z' },
];

export const mockDailyTasks: DailyTask[] = [
  { id: 1, title: 'Assista 5 vídeos', description: 'Termine de assistir 5 vídeos hoje.', reward: 0.50, progress: 2, goal: 5, isCompleted: false },
  { id: 2, title: 'Login Diário', description: 'Entre no app para coletar sua recompensa.', reward: 0.20, progress: 1, goal: 1, isCompleted: true },
  { id: 3, title: 'Convide 1 amigo', description: 'Chame um amigo para o app.', reward: 10.00, progress: 0, goal: 1, isCompleted: false },
];

export const mockWithdrawalRequests: WithdrawalRequest[] = [
    { id: 'w1', userId: 'u1', userName: 'Alice', amount: 25.00, method: 'PIX', pixKey: 'alice@email.com', date: '2023-10-28T14:00:00Z', status: 'pending' },
    { id: 'w2', userId: 'u2', userName: 'Bob', amount: 50.00, method: 'PagBank', pixKey: '123.456.789-00', date: '2023-10-27T18:00:00Z', status: 'approved' },
    { id: 'w3', userId: 'u4', userName: 'Diana', amount: 15.00, method: 'PIX', pixKey: '(11) 98765-4321', date: '2023-10-26T12:00:00Z', status: 'rejected' },
];

export const mockSettings: Settings = {
  general: {
    appName: "CASHVIRAL",
    appLogo: null,
    privacyPolicyUrl: "https://seu-site.com/politica-de-privacidade",
  },
  rewards: {
    rewardPerVideo: 0.10,
    minWatchTime: 30,
    dailyLoginBonus: 0.25,
    inviteBonus: 5.00,
    minWithdrawal: 20.00,
    dailyWithdrawalLimit: 100.00,
  },
  monetization: {
    paymentGateways: {
      mercadoPago: { enabled: true, apiKey: "" },
      pagBank: { enabled: true, apiKey: "" },
      stripe: { enabled: false, apiKey: "" },
      paypal: { enabled: false, apiKey: "" },
    },
    adsense: {
      enabled: true,
      publisherId: "ca-pub-8115686562988147",
    },
    customAds: [
      { id: 1, position: 'home_top_banner', code: '<div style="width: 320px; height: 50px; background: #333; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px;">Anúncio Topo Home</div>', enabled: true },
      { id: 2, position: 'video_feed_interstitial', code: '<div style="width: 300px; height: 250px; background: #333; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px;">Anúncio Feed</div>', enabled: true },
    ],
  },
  api: {
    youtubeApiKey: "",
    geminiApiKey: "",
  },
  security: {
    maintenanceMode: {
      enabled: false,
      message: "Estamos em manutenção. Voltamos em breve!",
    },
    admin2FA: false,
  },
};
