
import React from 'react';
import { mockWithdrawalRequests } from '../../data/mockData';
import { WithdrawalRequest } from '../../types';

const StatusBadge: React.FC<{ status: WithdrawalRequest['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
  };

const RewardsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Recompensas</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Configurações</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="rewardPerVideo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor por vídeo assistido (R$)</label>
            <input type="number" id="rewardPerVideo" defaultValue="0.10" step="0.01" className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div>
            <label htmlFor="minWatchTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tempo mínimo de exibição (segundos)</label>
            <input type="number" id="minWatchTime" defaultValue="30" className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Salvar Configurações</button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Pedidos de Saque</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Usuário</th>
                <th scope="col" className="px-6 py-3">Valor</th>
                <th scope="col" className="px-6 py-3">Método</th>
                <th scope="col" className="px-6 py-3">Data</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockWithdrawalRequests.map(req => (
                <tr key={req.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{req.userName}</td>
                  <td className="px-6 py-4">R$ {req.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{req.method}</td>
                  <td className="px-6 py-4">{new Date(req.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                  <td className="px-6 py-4">
                    {req.status === 'pending' && (
                      <>
                        <button className="font-medium text-green-600 dark:text-green-500 hover:underline">Aprovar</button>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4">Recusar</button>
                      </>
                    )}
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

export default RewardsPage;
