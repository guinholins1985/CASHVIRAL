
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Configurações Avançadas</h1>

      <div className="space-y-8">
        {/* App Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 dark:border-gray-700">Dados do App</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="appName" className="block text-sm font-medium">Nome do App</label>
              <input type="text" id="appName" defaultValue="CASHVIRAL" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
              <label htmlFor="appLogo" className="block text-sm font-medium">Logo do App</label>
              <input type="file" id="appLogo" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
            </div>
             <div>
              <label htmlFor="appPolicy" className="block text-sm font-medium">Política de Privacidade (URL)</label>
              <input type="url" id="appPolicy" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </form>
        </div>

        {/* Withdrawal Limits */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 dark:border-gray-700">Limites de Saque</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="minWithdraw" className="block text-sm font-medium">Saque Mínimo (R$)</label>
                <input type="number" id="minWithdraw" defaultValue="20.00" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label htmlFor="dailyLimit" className="block text-sm font-medium">Limite Diário por Usuário (R$)</label>
                <input type="number" id="dailyLimit" defaultValue="100.00" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </form>
        </div>
        
        {/* API Keys */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 dark:border-gray-700">API Keys</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="youtubeApi" className="block text-sm font-medium">YouTube API Key</label>
              <input type="password" id="youtubeApi" placeholder="••••••••••••••••••••" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
             <div>
              <label htmlFor="geminiApi" className="block text-sm font-medium">Gemini AI API Key</label>
              <input type="password" id="geminiApi" placeholder="••••••••••••••••••••" className="mt-1 w-full max-w-lg p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </form>
        </div>
        
        <div className="flex justify-end">
            <button className="bg-primary-600 text-white font-bold px-6 py-2 rounded-md hover:bg-primary-700">
                Salvar Todas as Alterações
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
