import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EyeIcon, EyeOffIcon } from '../../components/icons';

interface LoginPageProps {
    onSwitchToRegister: () => void;
}

type LoginTab = 'user' | 'admin';

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister }) => {
    const [activeTab, setActiveTab] = useState<LoginTab>('user');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(username, password);
            if (!user) {
                setError('Usuário ou senha inválidos.');
            } else if (activeTab === 'admin' && !user.isAdmin) {
                setError('Acesso negado. Apenas administradores.');
            } else if (activeTab === 'user' && user.isAdmin) {
                setError('Login de administrador deve ser feito na aba "Admin".');
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        }
    };
    
    const TabButton: React.FC<{tab: LoginTab; label: string}> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-1/2 py-3 text-center font-bold transition-colors duration-300 ${activeTab === tab ? 'border-b-2 border-primary-500 text-white' : 'text-gray-400'}`}
        >
            {label}
        </button>
    )

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-primary-500">CASH<span className="text-white">VIRAL</span></h1>
                    <p className="text-gray-400 mt-2">Assista, ganhe, repita.</p>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                    <div className="flex border-b border-gray-700 mb-6">
                        <TabButton tab="user" label="Usuário"/>
                        <TabButton tab="admin" label="Administrador"/>
                    </div>
                    
                    {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2">Usuário</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-primary-500"
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2">Senha</label>
                             <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-primary-500"
                                    required 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                                    {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-primary-600 font-bold py-3 rounded-md hover:bg-primary-700 transition-colors">
                            Entrar
                        </button>
                    </form>

                    {activeTab === 'user' && (
                         <p className="text-center text-sm text-gray-400 mt-6">
                            Não tem uma conta?{' '}
                            <button onClick={onSwitchToRegister} className="font-bold text-primary-500 hover:underline">
                                Cadastre-se
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
