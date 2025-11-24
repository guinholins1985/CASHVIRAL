
import React from 'react';
import { mockVideos } from '../../data/mockData';

const VideosPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Vídeos</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Vídeo</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Cole o link do YouTube, Vimeo, etc."
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
          />
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Adicionar</button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Vídeos Cadastrados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Thumbnail</th>
                <th scope="col" className="px-6 py-3">Título</th>
                <th scope="col" className="px-6 py-3">Views</th>
                <th scope="col" className="px-6 py-3">Likes</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockVideos.slice(0, 10).map(video => (
                <tr key={video.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <img src={video.thumbnail} alt={video.title} className="w-24 h-14 object-cover rounded-md"/>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{video.title}</td>
                  <td className="px-6 py-4">{video.views.toLocaleString()}</td>
                  <td className="px-6 py-4">{video.likes.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className="text-green-500">Ativo</span></td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Ver Stats</button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4">Desativar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
