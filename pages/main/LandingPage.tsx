import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
    onEnter: () => void;
}

const ParticleBackground: React.FC = () => {
    useEffect(() => {
        const container = document.getElementById('particle-container');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            container.appendChild(particle);
        }
    }, []);

    return <div id="particle-container" className="absolute inset-0 z-0 overflow-hidden"></div>;
};

const Torus: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div style={style} className="relative w-64 h-64">
        <div className="absolute inset-0 rounded-full"
            style={{
                transform: 'rotateX(75deg)',
                transformStyle: 'preserve-3d',
                background: 'radial-gradient(circle, transparent 45%, #39FF14 50%, #2E8B57 60%, transparent 70%)',
                boxShadow: 'inset 0 0 20px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.3)',
                animation: 'spin 20s linear infinite'
            }}>
        </div>
         <div className="absolute inset-0 rounded-full"
            style={{
                transform: 'rotateX(75deg) translateZ(2px)',
                transformStyle: 'preserve-3d',
                background: 'radial-gradient(circle, transparent 45%, #39FF14 50%, #2E8B57 60%, transparent 70%)',
                 filter: 'blur(5px)'
            }}>
        </div>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    const [style, setStyle] = useState({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, currentTarget } = e;
            if(!(currentTarget instanceof Window)) return;
            const { innerWidth, innerHeight } = currentTarget;
            
            const rotateX = -((clientY / innerHeight) - 0.5) * 30; 
            const rotateY = ((clientX / innerWidth) - 0.5) * 30;
            
            setStyle({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
                transition: 'transform 0.1s ease-out'
            });
        };
        
        const handleMouseLeave = () => {
             setStyle({
                transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
                transition: 'transform 0.5s ease-in-out'
            });
        }

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-obsidian text-white overflow-hidden p-4 relative">
            <ParticleBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian z-0"></div>

            <div className="z-10 text-center flex flex-col items-center">
                 <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider glow-title">
                    Sua Jornada Viral
                </h1>
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-wider">Começa Aqui</h2>
                <p className="max-w-2xl text-lg text-gray-400 mb-8">
                    Transforme seu tempo de tela em recompensas reais. Descubra vídeos incríveis, complete missões diárias e saque seus ganhos.
                </p>

                <div ref={containerRef} style={{ transformStyle: 'preserve-3d' }} className="my-8">
                    <Torus style={style} />
                </div>

                <button 
                    onClick={onEnter} 
                    className="shine-button mt-8 px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-neon-green to-neon-green-dark rounded-full shadow-lg shadow-neon-green/20 transform hover:scale-105 transition-all duration-300"
                >
                    Começar a Ganhar Agora
                </button>
            </div>
        </div>
    );
};

export default LandingPage;