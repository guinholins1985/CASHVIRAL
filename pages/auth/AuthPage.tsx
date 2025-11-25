import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EyeIcon, EyeOffIcon, LogoIcon, MailIcon, LockClosedIcon, UserIcon } from '../../components/icons';

const ParticleBackground: React.FC = () => {
    useEffect(() => {
        const container = document.getElementById('particle-container-auth');
        if (!container) return;
        if(container.children.length > 0) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
            container.appendChild(particle);
        }
    }, []);

    return <div id="particle-container-auth" className="absolute inset-0 z-0 overflow-hidden"></div>;
};


const AuthInput: React.FC<{ type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon: React.ReactNode }> = ({ type, placeholder, value, onChange, icon }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
        </span>
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-3 pl-10 bg-black/20 text-white rounded-md border border-neon-green/20 focus:outline-none focus:border-neon-green transition-colors"
            required 
        />
    </div>
);


const LoginForm: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
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
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        }
    };

    return (
        <div className="auth-front p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Bem-vindo de Volta</h2>
            <p className="text-center text-gray-400 mb-8">Faça login para continuar sua jornada.</p>
            
            {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
                <AuthInput type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} icon={<UserIcon className="w-5 h-5"/>} />
                <div className="relative">
                     <AuthInput type={showPassword ? 'text' : 'password'} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockClosedIcon className="w-5 h-5"/>} />
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                        {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-neon-green to-neon-green-dark font-bold text-obsidian py-3 rounded-md hover:opacity-90 transition-opacity shine-button">
                    Entrar
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Não tem uma conta?{' '}
                <button onClick={onSwitchToRegister} className="font-bold text-neon-green hover:underline">
                    Cadastre-se
                </button>
            </p>
        </div>
    );
};

const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
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
        <div className="auth-back p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Crie sua Conta</h2>
            <p className="text-center text-gray-400 mb-8">Comece a ganhar hoje mesmo.</p>

            {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}
            
            <form onSubmit={handleRegister} className="space-y-4">
                 <AuthInput type="text" placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} icon={<UserIcon className="w-5 h-5"/>} />
                 <AuthInput type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} icon={<UserIcon className="w-5 h-5"/>} />
                 <AuthInput type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} icon={<MailIcon className="w-5 h-5"/>} />
                <div className="relative">
                     <AuthInput type={showPassword ? 'text' : 'password'} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockClosedIcon className="w-5 h-5"/>} />
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                        {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-neon-green to-neon-green-dark font-bold text-obsidian py-3 rounded-md hover:opacity-90 transition-opacity shine-button mt-4">
                    Criar Conta
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
                Já tem uma conta?{' '}
                <button onClick={onSwitchToLogin} className="font-bold text-neon-green hover:underline">
                    Faça Login
                </button>
            </p>
        </div>
    );
};

const AuthPage: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-obsidian p-4 relative overflow-hidden">
            <ParticleBackground />
            <div className="relative z-10 w-full max-w-md">
                 <div className="flex justify-center mb-8">
                    <LogoIcon className="w-24 h-24 text-neon-green"/>
                </div>
                <div className="auth-container h-[520px]">
                    <div className={`auth-flipper ${isFlipped ? 'is-flipped' : ''}`}>
                         <div className="bg-black/30 backdrop-blur-xl border border-neon-green/20 rounded-2xl shadow-2xl shadow-neon-green/10">
                            <LoginForm onSwitchToRegister={() => setIsFlipped(true)} />
                        </div>
                        <div className="bg-black/30 backdrop-blur-xl border border-neon-green/20 rounded-2xl shadow-2xl shadow-neon-green/10">
                             <RegisterForm onSwitchToLogin={() => setIsFlipped(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;