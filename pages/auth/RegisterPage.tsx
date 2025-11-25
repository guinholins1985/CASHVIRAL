import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EyeIcon, EyeOffIcon } from '../../components/icons';

interface RegisterPageProps {
    onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        try {
            const user = await register(name, username, email, password);
            if (!user) {
                setError('Usuário ou e-mail já existem.');
            }
        } catch (err) {
            setError('Ocorreu um erro no cadastro. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-primary-500">CASH<span className="text-white">VIRAL</span></h1>
                    <p className="text-gray-400 mt-2">Crie sua conta e comece a ganhar.</p>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Cadastro de Usuário</h2>
                    
                    {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4">{error}</p>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2">Nome Completo</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-primary-500"
                                required 
                            />
                        </div>
                         <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2">Nome de Usuário</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-primary-500"
                                required 
                            />
                        </div>
                         <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2">E-mail</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <button type="submit" className="w-full bg-primary-600 font-bold py-3 rounded-md hover:bg-primary-700 transition-colors mt-6">
                            Criar Conta
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Já tem uma conta?{' '}
                        <button onClick={onSwitchToLogin} className="font-bold text-primary-500 hover:underline">
                            Faça Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
