import React, { useState } from 'react';
import { useVideos } from '../../hooks/useVideos';

const VideosPage: React.FC = () => {
  const { videos, addVideo, deleteVideo } = useVideos();
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const handleAddVideo = () => {
    if (newVideoUrl.trim()) {
      addVideo(newVideoUrl);
      setNewVideoUrl('');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Vídeos</h1>

      {/* Add Video Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Vídeo</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Cole a URL do vídeo ou playlist (YouTube, Vimeo, etc.)"
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <button 
            onClick={handleAddVideo}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Vídeos Cadastrados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Thumbnail</th>
                <th scope="col" className="px-6 py-3">Título</th>
                <th scope="col" className="px-6 py-3">Visualizações</th>
                <th scope="col" className="px-6 py-3">Likes</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map(video => (
                  <tr key={video.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      <img src={video.thumbnail} alt={video.title} className="w-24 h-14 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {video.title}
                    </td>
                    <td className="px-6 py-4">{video.views.toLocaleString()}</td>
                    <td className="px-6 py-4">{video.likes.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => deleteVideo(video.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p className="text-lg">Nenhum vídeo cadastrado.</p>
                    <p className="text-sm">Adicione uma URL de vídeo acima para começar a preencher a lista.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;