import { User, Video, Transaction, DailyTask, WithdrawalRequest, Settings } from '../types';

export const mockUsers: User[] = [
  { id: 'u0', name: 'Admin User', username: 'ad', email: 'admin@cashviral.com', password: 'a12', avatar: 'https://picsum.photos/seed/admin/100', balance: 9999, status: 'active', joinDate: '2023-01-01', isAdmin: true },
  { id: 'u1', name: 'Alice', username: 'alice', email: 'alice@example.com', password: 'password123', avatar: 'https://picsum.photos/seed/alice/100', balance: 125.50, status: 'active', joinDate: '2023-10-01' },
  { id: 'u2', name: 'Bob', username: 'bob', email: 'bob@example.com', password: 'password123', avatar: 'https://picsum.photos/seed/bob/100', balance: 78.20, status: 'active', joinDate: '2023-10-05' },
  { id: 'u3', name: 'Charlie', username: 'charlie', email: 'charlie@example.com', password: 'password123', avatar: 'https://picsum.photos/seed/charlie/100', balance: 0, status: 'banned', joinDate: '2023-10-10' },
  { id: 'u4', name: 'Diana', username: 'diana', email: 'diana@example.com', password: 'password123', avatar: 'https://picsum.photos/seed/diana/100', balance: 340.00, status: 'active', joinDate: '2023-10-12' },
  { id: 'u5', name: 'Eve', username: 'eve', email: 'eve@example.com', password: 'password123', avatar: 'https://picsum.photos/seed/eve/100', balance: 15.75, status: 'inactive', joinDate: '2023-10-15' },
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
  { id: 't1', type: 'earn', amount: 0.10, description: 'Watched "Awesome Video #1"', date: '2023-1