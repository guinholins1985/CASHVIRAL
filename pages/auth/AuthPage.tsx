import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EyeIcon, EyeOffIcon, LogoIcon, MailIcon, LockClosedIcon, UserIcon, GoogleIcon, AppleIcon, VideoIcon, GiftIcon } from '../../components/icons';

const AuthVisual: React.FC = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Floating elements */}
        <div 
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-green/10 rounded-full flex items-center justify-center animate-float"
            style={{ animationDelay: '0s' }}
        >
            <VideoIcon className="w-16 h-16 text-neon-green opacity-50"/>
        </div>
        <div 
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center animate-float"
            style={{ animationDelay: '2s' }}
        >
            <GiftIcon className="w-12 h-12 text-gold opacity-50"/>
        </div>
        <div 
            className="absolute top-1/2 right-1/3 w-40 h-40 border-2 border-neon-green/20 rounded-2xl animate-float"
            style={{ animationDelay: '1s' }}
        />
        <div className="text-center text-white z-10 p-8 bg-obsidian/50 rounded-lg">
             <h1 className="text-5xl font-black mb-4 uppercase tracking-wider glow-title">
                Sua Jornada Viral
            </h1>
            <p className="max-w-md text-lg text-gray-400">
                Onde cada play se transforma em recompensa.
            </p>
        </div>
    </div>
);


const AuthInput: React.FC<{ type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; icon: React.ReactNode }> = ({ type, placeholder, value, onChange, icon }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            {icon}
        </span>
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-3 pl-12 bg-black/30 text-white rounded-lg border-2 border-transparent focus:outline-none focus:border-neon-green transition-colors duration-300"
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
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Login</h2>
            <p className="text-center text-gray-400 mb-6">Bem-vindo de volta!</p>
            
            {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
                <AuthInput type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} icon={<UserIcon className="w-5 h-5"/>} />
                <div className="relative">
                     <AuthInput type={showPassword ? 'text' : 'password'} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockClosedIcon className="w-5 h-5"/>} />
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400">
                        {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <div className="text-right">
                    <a href="#" className="text-sm text-neon-green/80 hover:text-neon-green hover:underline">Esqueceu a senha?</a>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-neon-green to-neon-green-dark font-bold text-obsidian py-3 rounded-lg hover:opacity-90 transition-opacity shine-button">
                    Entrar
                </button>
            </form>

            <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-700"/>
                <span className="px-4 text-gray-500 text-sm">OU</span>
                <hr className="flex-grow border-gray-700"/>
            </div>

            <div className="space-y-3">
                 <button className="w-full flex items-center justify-center py-3 px-4 bg-black/30 rounded-lg border-2 border-transparent hover:border-white transition-colors">
                    <GoogleIcon className="w-6 h-6 mr-3" />
                    <span className="font-semibold text-sm">Entrar com Google</span>
                </button>
                <button className="w-full flex items-center justify-center py-3 px-4 bg-black/30 rounded-lg border-2 border-transparent hover:border-white transition-colors">
                    <AppleIcon className="w-6 h-6 mr-3" />
                    <span className="font-semibold text-sm">Entrar com Apple</span>
                </button>
            </div>


            <p className="text-center text-sm text-gray-400 mt-8">
                Não tem uma conta?{' '}
                <button onClick={onSwitchToRegister} className="font-bold text-neon-green hover:underline">
                    Cadastre-se
                </button>
            </p>
        </div>
    );
};

const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
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
            // Passing username as both name and username for simplicity
            const user = await register(username, username, email, password);
            if (!user) {
                setError('Usuário ou e-mail já existem.');
            }
        } catch (err) {
            setError('Ocorreu um erro no cadastro. Tente novamente.');
        }
    };
    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-white mb-2">Crie sua Conta</h2>
            <p className="text-center text-gray-400 mb-6">Comece a ganhar hoje mesmo.</p>

            {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4 text-center">{error}</p>}
            
            <form onSubmit={handleRegister} className="space-y-4">
                 <AuthInput type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} icon={<UserIcon className="w-5 h-5"/>} />
                 <AuthInput type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} icon={<MailIcon className="w-5 h-5"/>} />
                <div className="relative">
                     <AuthInput type={showPassword ? 'text' : 'password'} placeholder="Senha (6+ caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockClosedIcon className="w-5 h-5"/>} />
                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400">
                        {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-neon-green to-neon-green-dark font-bold text-obsidian py-3 rounded-lg hover:opacity-90 transition-opacity shine-button mt-4">
                    Criar Conta
                </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-8">
                Já tem uma conta?{' '}
                <button onClick={onSwitchToLogin} className="font-bold text-neon-green hover:underline">
                    Faça Login
                </button>
            </p>
        </div>
    );
};

const AuthPage: React.FC = () => {
    const [view, setView] = useState<'login' | 'register'>('login');
    const [animation, setAnimation] = useState('');

    const switchView = (newView: 'login' | 'register') => {
        if (view !== newView) {
            setAnimation('animate-slide-out');
            setTimeout(() => {
                setView(newView);
                setAnimation('animate-slide-in');
            }, 500);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-obsidian text-white overflow-hidden">
            {/* Left Visual Column - Hidden on small screens */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-obsidian opacity-50"></div>
                <AuthVisual />
            </div>

            {/* Right Form Column */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 relative">
                <div className="absolute top-8 left-8">
                     <LogoIcon className="w-16 h-16 text-neon-green"/>
                </div>
                 <div className="w-full max-w-sm">
                    <div className={animation}>
                        {view === 'login' ? (
                            <LoginForm onSwitchToRegister={() => switchView('register')} />
                        ) : (
                            <RegisterForm onSwitchToLogin={() => switchView('login')} />
                        )}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AuthPage;