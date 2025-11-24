import React, { useState, useEffect, useRef } from 'react';
import { DollarSignIcon, VideoIcon, GiftIcon } from '../../components/icons';

interface LandingPageProps {
    onEnter: () => void;
}

const FloatingIcon: React.FC<{ icon: React.ReactNode, className: string }> = ({ icon, className }) => {
    return (
        <div className={`absolute text-white/50 ${className}`}>
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                {icon}
            </div>
        </div>
    );
}


const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    const [style, setStyle] = useState({});
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = e;
            const { width, height, left, top } = containerRef.current.getBoundingClientRect();
            
            const x = clientX - left;
            const y = clientY - top;
            
            const rotateX = -((y / height) - 0.5) * 20; // max rotation 10deg
            const rotateY = ((x / width) - 0.5) * 20; // max rotation 10deg
            
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
        containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden p-4 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-gray-900 to-gray-900 z-0"></div>
             <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="z-10 text-center flex flex-col items-center">
                 <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
                    Sua Jornada Viral
                </h1>
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-wider">Começa Aqui</h2>
                <p className="max-w-2xl text-lg text-gray-300 mb-8">
                    Transforme seu tempo de tela em recompensas reais. Descubra vídeos incríveis, complete missões diárias e saque seus ganhos.
                </p>

                <div ref={containerRef} style={{ transformStyle: 'preserve-3d' }}>
                    <div style={style} className="relative w-[300px] h-[200px] md:w-[450px] md:h-[250px] bg-gray-800/20 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
                         {/* Floating elements inside the 3D card */}
                         <div style={{ transform: 'translateZ(50px)' }}>
                            <FloatingIcon icon={<DollarSignIcon className="w-8 h-8"/>} className="top-8 left-8" />
                         </div>
                         <div style={{ transform: 'translateZ(80px)' }}>
                             <FloatingIcon icon={<VideoIcon className="w-8 h-8"/>} className="bottom-8 right-12" />
                         </div>
                         <div style={{ transform: 'translateZ(30px)' }}>
                            <FloatingIcon icon={<GiftIcon className="w-8 h-8"/>} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                         </div>
                    </div>
                </div>

                <button 
                    onClick={onEnter} 
                    className="mt-12 px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-lg hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300"
                >
                    Começar a Ganhar Agora
                </button>
            </div>
            <style jsx>{`
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-4000 {
                    animation-delay: -4s;
                }
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;