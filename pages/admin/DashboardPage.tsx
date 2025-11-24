import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowUpRightIcon, UsersIcon, DollarSignIcon, VideoIcon } from '../../components/icons';

const chartData = [
  { name: 'Seg', users: 12 }, { name: 'Ter', users: 19 },
  { name: 'Qua', users: 3 }, { name: 'Qui', users: 5 },
  { name: 'Sex', users: 2 }, { name: 'Sáb', users: 3 },
  { name: 'Dom', users: 10 },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; change: string; changeType: 'increase' | 'decrease' }> = ({ title, value, icon, change, changeType }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            {icon}
        </div>
        <p className="text-3xl font-bold">{value}</p>
        <div className={`flex items-center text-sm mt-2 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            <ArrowUpRightIcon className={`w-4 h-4 mr-1 ${changeType === 'decrease' ? 'transform rotate-180' : ''}`} />
            <span>{change}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs. semana passada</span>
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Usuários" value="1,234" icon={<UsersIcon className="w-6 h-6 text-primary-500" />} change="+12%" changeType="increase" />
        <StatCard title="Vídeos Assistidos" value="25.4K" icon={<VideoIcon className="w-6 h-6 text-primary-500" />} change="+8%" changeType="increase" />
        <StatCard title="Saldo a Pagar" value="R$ 4,321.00" icon={<DollarSignIcon className="w-6 h-6 text-primary-500" />} change="-2.1%" changeType="decrease" />
        <StatCard title="Usuários Ativos" value="345" icon={<UsersIcon className="w-6 h-6 text-primary-500" />} change="+5%" changeType="increase" />
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Crescimento de Usuários</h2>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="currentColor" />
                    <YAxis stroke="currentColor" />
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <Tooltip contentStyle={{ backgroundColor: 'black', border: 'none' }} />
                    <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;