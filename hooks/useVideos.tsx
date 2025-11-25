import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Video } from '../types';
import { mockVideos as initialVideos } from '../data/mockData';

interface VideosContextType {
  videos: Video[];
  addVideo: (url: string) => void;
  deleteVideo: (id: string) => void;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

const initializeVideos = (): Video[] => {
    try {
        const storedVideos = localStorage.getItem('cashviral_videos');
        if (storedVideos) {
            return JSON.parse(storedVideos);
        }
    } catch (error) {
        console.error("Failed to parse videos from localStorage", error);
    }
    localStorage.setItem('cashviral_videos', JSON.stringify(initialVideos));
    return initialVideos;
};

export const VideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(initializeVideos);

  const addVideo = useCallback((url: string) => {
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
    
    setVideos(prevVideos => {
        const updatedVideos = [newVideo, ...prevVideos];
        localStorage.setItem('cashviral_videos', JSON.stringify(updatedVideos));
        return updatedVideos;
    });
  }, []);

  const deleteVideo = useCallback((id: string) => {
    setVideos(prevVideos => {
        const updatedVideos = prevVideos.filter(video => video.id !== id);
        localStorage.setItem('cashviral_videos', JSON.stringify(updatedVideos));
        return updatedVideos;
    });
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