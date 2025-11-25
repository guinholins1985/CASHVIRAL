import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { HeartIcon, MessageCircleIcon, ShareIcon, VideoIcon, VolumeXIcon, Volume2Icon, PlayIcon } from '../../components/icons';
import { Video, AdPosition } from '../../types';
import AdRenderer from '../../components/AdRenderer';
import { useVideos } from '../../hooks/useVideos';

interface VideoPlayerProps {
    video: Video;
    isVisible: boolean;
    onVideoEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isVisible, onVideoEnded }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef<ReactPlayer>(null);

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
          setShowPlayIcon(true);
          setTimeout(() => setShowPlayIcon(false), 800);
        }
    };
    
    // The "stop" function pauses the video and seeks to the beginning.
    // It can be attached to a UI element if needed in the future.
    const handleStop = () => {
        setIsPlaying(false);
        playerRef.current?.seekTo(0);
    };

    const handleProgress = (state: { played: number }) => {
        if(isVisible) {
            setProgress(state.played);
        }
    };

    useEffect(() => {
        // Reset progress when video is no longer visible
        if (!isVisible) {
            setProgress(0);
        }
    }, [isVisible]);

    return (
        <div className="relative h-full w-full snap-start flex-shrink-0 bg-black" onClick={handleTogglePlay}>
            <ReactPlayer
                ref={playerRef}
                url={video.url}
                playing={isVisible && isPlaying}
                muted={isMuted}
                loop={false} // Must be false for onEnded to work
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                playsinline // Important for mobile browsers
                onEnded={onVideoEnded} // Triggers auto-scroll
                onProgress={handleProgress} // Updates the real progress bar
            />
            
            {showPlayIcon && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 animate-ping-once">
                <PlayIcon className="w-24 h-24 text-white/80" style={{filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'}}/>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-16 left-4 right-16 text-white p-4 pointer-events-none">
                <div className="flex items-center mb-2">
                    <img src={video.uploaderAvatar} alt={video.uploader} className="w-10 h-10 rounded-full border-2 border-white mr-3" />
                    <h3 className="font-bold text-lg">{video.uploader}</h3>
                </div>
                <p className="text-sm">{video.title}</p>
            </div>
            
            <div className="absolute bottom-20 right-2 flex flex-col items-center space-y-6 text-white">
                <button onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} className="flex flex-col items-center">
                    <HeartIcon className={`w-8 h-8 transition-colors ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                    <span className="text-xs mt-1">{video.likes.toLocaleString()}</span>
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
                    <MessageCircleIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">{Math.floor(video.likes / 10).toLocaleString()}</span>
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
                    <ShareIcon className="w-8 h-8" />
                    <span className="text-xs mt-1">Compartilhar</span>
                </button>
                 <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="flex flex-col items-center">
                    {isMuted ? <VolumeXIcon className="w-8 h-8" /> : <Volume2Icon className="w-8 h-8" />}
                    <span className="text-xs mt-1">{isMuted ? 'Som' : 'Mudo'}</span>
                </button>
            </div>
            
            <div className="absolute bottom-4 left-4 h-1.5 bg-white/20 rounded-full w-2/3 pointer-events-none">
                <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{width: `${progress * 100}%`, transition: 'width 0.1s linear'}}>
                </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    const [currentFeedIndex, setCurrentFeedIndex] = useState(0);
    const { videos } = useVideos();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Create a unified feed with videos and ads for robust indexing
    const feedItems = videos.reduce<(Video | { type: 'ad'; position: AdPosition })[]>((acc, video, index) => {
        acc.push(video);
        if ((index + 1) % 5 === 0) {
            acc.push({ type: 'ad', position: 'video_feed_interstitial' });
        }
        return acc;
    }, []);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight } = event.currentTarget;
        const index = Math.round(scrollTop / clientHeight);
        if(index !== currentFeedIndex){
            setCurrentFeedIndex(index);
        }
    };
    
    const handleVideoEnded = (endedItemIndex: number) => {
        if (scrollContainerRef.current && endedItemIndex < feedItems.length - 1) {
            const container = scrollContainerRef.current;
            const nextItemPosition = (endedItemIndex + 1) * container.clientHeight;
            container.scrollTo({
                top: nextItemPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            ref={scrollContainerRef}
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory" 
            onScroll={handleScroll}
        >
            <AdRenderer position="home_top_banner" />
            {feedItems.length > 0 ? (
                feedItems.map((item, index) => {
                    if ('url' in item) { // It's a Video
                        return (
                             <VideoPlayer 
                                key={item.id} 
                                video={item} 
                                isVisible={index === currentFeedIndex} 
                                onVideoEnded={() => handleVideoEnded(index)} 
                            />
                        )
                    } else { // It's an Ad
                        return (
                            <div key={`ad-${index}`} className="h-full w-full snap-start flex-shrink-0 bg-black flex items-center justify-center p-4">
                               <AdRenderer position={item.position} />
                            </div>
                        )
                    }
                })
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