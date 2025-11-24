
import React from 'react';
import { mockUsers, mockTransactions } from '../../data/mockData';
import { Transaction } from '../../types';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isCredit = transaction.amount > 0;
    const amountColor = isCredit ? 'text-green-400' : 'text-red-400';
    const sign = isCredit ? '+' : '';

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <div>
                <p className="font-semibold text-white">{transaction.description}</p>
                <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleString()}</p>
            </div>
            <p className={`font-bold ${amountColor}`}>{sign} R$ {transaction.amount.toFixed(2)}</p>
        </div>
    )
}

const ProfilePage: React.FC = () => {
  const user = mockUsers[0]; // Simulate logged-in user

  return (
    <div className="h-full w-full bg-gray-900 text-white p-4 overflow-y-auto pb-20">
      <div className="flex flex-col items-center pt-8">
        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary-500" />
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-400">{user.email}</p>
      </div>

      <div className="my-8 bg-gray-800 p-6 rounded-xl text-center">
        <p className="text-gray-300 text-sm">Saldo Atual</p>
        <p className="text-4xl font-bold text-yellow-400 my-2">R$ {user.balance.toFixed(2)}</p>
        <button className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-primary-700">
          Sacar
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Histórico de Ganhos</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          {mockTransactions.map(tx => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="text-gray-400 hover:text-red-500">
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
