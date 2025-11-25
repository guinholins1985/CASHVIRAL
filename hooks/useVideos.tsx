import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Video } from '../types';
import { mockVideos as initialVideos } from '../data/mockData';

interface VideosContextType {
  videos: Video[];
  addVideo: (url: string) => void;
  deleteVideo: (id: string) => void;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

// Initialize videosDB from localStorage or initial mockData
const initializeVideos = (): Video[] => {
    try {
        const storedVideos = localStorage.getItem('cashviral_videos');
        if (storedVideos) {
            return JSON.parse(storedVideos);
        }
    } catch (error) {
        console.error("Failed to parse videos from localStorage", error);
    }
    // If nothing in localStorage, use initial data and save it
    localStorage.setItem('cashviral_videos', JSON.stringify(initialVideos));
    return initialVideos;
};

let videosDB = initializeVideos();

export const VideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(videosDB);

  const addVideo = useCallback((url: string) => {
    // In a real app, you would fetch video details from the URL (e.g., using YouTube API)
    // Here, we'll just create a mock video object.
    const newVideo: Video = {
      id: `v${Date.now()}`,
      title: `Novo Vídeo Adicionado`,
      thumbnail: `https://picsum.photos/seed/${Date.now()}/480/854`,
      url: url,
      duration: "03:14",
      views: 0,
      likes: 0,
      uploader: "Admin",
      uploaderAvatar: 'https://picsum.photos/seed/admin/100',
    };
    videosDB = [newVideo, ...videosDB];
    localStorage.setItem('cashviral_videos', JSON.stringify(videosDB));
    setVideos([...videosDB]); // Use spread to ensure re-render
  }, []);

  const deleteVideo = useCallback((id: string) => {
    videosDB = videosDB.filter(video => video.id !== id);
    localStorage.setItem('cashviral_videos', JSON.stringify(videosDB));
    setVideos([...videosDB]); // Use spread to ensure re-render
  }, []);

  return (
    <VideosContext.Provider value={{ videos, addVideo, deleteVideo }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = (): VideosContextType => {
  const context = useContext(VideosContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideosProvider');
  }
  return context;
};