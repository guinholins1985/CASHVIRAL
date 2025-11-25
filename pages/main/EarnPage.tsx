
import React from 'react';
import { mockDailyTasks } from '../../data/mockData';
import { DailyTask } from '../../types';
import AdRenderer from '../../components/AdRenderer';

const TaskCard: React.FC<{ task: DailyTask }> = ({ task }) => (
  <div className="bg-gray-800 p-4 rounded-lg mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg text-white">{task.title}</h3>
        <p className="text-sm text-gray-400">{task.description}</p>
        <p className="text-yellow-400 font-bold mt-1">+ R$ {task.reward.toFixed(2)}</p>
      </div>
      <button
        className={`px-4 py-2 rounded-full font-bold text-sm ${
          task.isCompleted
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-yellow-400 text-black hover:bg-yellow-500'
        }`}
        disabled={task.isCompleted}
      >
        {task.isCompleted ? 'Completo' : 'Ir'}
      </button>
    </div>
    <div className="mt-4">
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${(task.progress / task.goal) * 100}%` }}
        ></div>
      </div>
      <p className="text-right text-xs text-gray-400 mt-1">{task.progress}/{task.goal}</p>
    </div>
  </div>
);

const EarnPage: React.FC = () => {
  return (
    <div className="h-full w-full bg-gray-900 text-white p-4 overflow-y-auto pb-20">
      <header className="text-center my-4">
        <h1 className="text-3xl font-bold">Ganhe Mais</h1>
        <p className="text-gray-400">Complete tarefas e convide amigos para aumentar seus ganhos.</p>
      </header>

      <AdRenderer position="earn_page_banner" />
      
      <div className="bg-yellow-400 text-black p-6 rounded-xl text-center my-6">
        <h2 className="text-2xl font-bold">Convide um Amigo</h2>
        <p className="mt-1 mb-4">Você e seu amigo ganham R$ 20,00!</p>
        <div className="bg-yellow-300 p-2 rounded-lg font-mono text-lg my-2">
          MEUCODIGO123
        </div>
        <button className="w-full bg-black text-white font-bold py-3 rounded-lg mt-4 hover:bg-gray-800">
          Convidar Agora
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Missões Diárias</h2>
        {mockDailyTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Opções de Saque</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="font-bold">PIX</h3>
            <p className="text-xs text-gray-400">Rápido e fácil</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="font-bold">Gift Cards</h3>
            <p className="text-xs text-gray-400">iFood, Uber, etc.</p>
          </div>
           <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="font-bold">Saldo Virtual</h3>
            <p className="text-xs text-gray-400">Use no app</p>
          </div>
           <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="font-bold">PagBank</h3>
            <p className="text-xs text-gray-400">Carteira digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnPage;