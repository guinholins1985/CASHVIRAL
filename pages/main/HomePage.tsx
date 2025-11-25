import React, { useState } from 'react';
import { HeartIcon, MessageCircleIcon, ShareIcon, UserIcon, VideoIcon } from '../../components/icons';
import { Video } from '../../types';
import AdRenderer from '../../components/AdRenderer';
import { useVideos } from '../../hooks/useVideos';

const VideoPlayer: React.FC<{ video: Video; isVisible: boolean }> = ({ video, isVisible }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="relative h-full w-full snap-start flex-shrink-0 bg-black">
            <img src={video.thumbnail} alt={video.title} className="object-cover h-full w-full" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-16 left-4 right-16 text-white p-4">
                <div className="flex items-center mb-2">
                    <img src={video.uploaderAvatar} alt={video.uploader} className="w-10 h-10 rounded-full border-2 border-white mr-3" />
                    <h3 className="font-bold text-lg">{video.uploader}</h3>
                </div>
                <p className="text-sm">{video.title}</p>
            </div>
            
            <div className="absolute bottom-16 right-2 flex flex-col items-center space-y-6 text-white">
                <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center">
                    <HeartIcon className={`w-8 h-8 transition-colors ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                    <span className="text-xs mt-1">{video.likes.toLocaleString()}</span>
                </button>
                <button className="flex flex-col items-center">
                    <MessageCircleIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">{Math.floor(video.likes / 10).toLocaleString()}</span>
                </button>
                <button className="flex flex-col items-center">
                    <ShareIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Compartilhar</span>
                </button>
            </div>
            
            {/* Mock watch timer */}
            <div className="absolute bottom-4 left-4 h-1.5 bg-white/20 rounded-full w-2/3">
                <div className="h-full bg-yellow-400 rounded-full" style={{width: isVisible ? '100%' : '0%', transition: isVisible ? 'width 30s linear' : 'none'}}></div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const { videos } = useVideos();

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight } = event.currentTarget;
        const index = Math.round(scrollTop / clientHeight);
        if(index !== currentVideoIndex){
            setCurrentVideoIndex(index);
        }
    };
    
    return (
        <div 
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory" 
            onScroll={handleScroll}
        >
            <AdRenderer position="home_top_banner" />
            {videos.length > 0 ? (
                videos.map((video, index) => (
                    <React.Fragment key={video.id}>
                        <VideoPlayer video={video} isVisible={index === currentVideoIndex} />
                        {(index + 1) % 5 === 0 && (
                            <div className="h-full w-full snap-start flex-shrink-0 bg-black flex items-center justify-center p-4">
                               <AdRenderer position="video_feed_interstitial" />
                            </div>
                        )}
                    </React.Fragment>
                ))
            ) : (
                <div className="h-full w-full flex items-center justify-center text-center text-gray-400">
                    <div>
                        <VideoIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <h2 className="text-2xl font-bold text-white">Nenhum vídeo por aqui...</h2>
                        <p>O administrador ainda não adicionou nenhum vídeo.</p>
                        <p>Volte mais tarde!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;