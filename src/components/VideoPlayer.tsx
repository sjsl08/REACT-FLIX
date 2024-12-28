import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from 'lucide-react'; // Import icons from Lucide React

interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  toggleMute?: () => void;
  pip?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, isMuted, toggleMute, pip }) => {
  const location = useLocation();
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(location.pathname.startsWith('/watch'));

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (progress: { played: number }) => {
    setProgress(progress.played);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current?.seekTo(seekTo);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000); // Hide controls after 3 seconds of inactivity
  };

  useEffect(() => {
    setVolume(mute ? 0 : 0.8);
  }, [mute]);

  const toggleWatchMute = () => {
    setMute(!mute);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${pip ? 'h-[150px]' : 'h-screen'} bg-black flex justify-center items-center ${
        location.pathname.startsWith('/watch') ? 'scale-100' : 'scale-150'
      }`}
      onMouseMove={handleMouseMove}
      onContextMenu={handleContextMenu}
    >
      {/* React Player */}
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoId}`}
        playing={playing}
        muted={location.pathname.startsWith('/watch') ? mute : isMuted}
        volume={volume}
        onProgress={handleProgress}
        width="100%"
        height="100%"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />

      {/* Custom Controls */}
      {showControls && !pip && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center bg-black/70 py-3 px-6 rounded-lg transition-opacity duration-300">
          {/* Play/Pause Button */}
          <button
            className="text-white hover:text-gray-300 transition"
            onClick={handlePlayPause}
          >
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            className="text-white hover:text-gray-300 transition"
            onClick={location.pathname.startsWith('/watch') ? toggleWatchMute : toggleMute}
          >
            {mute ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Volume Control */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32 bg-gray-700 focus:outline-none"
          />

          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={handleSeek}
            className="flex-grow bg-gray-700 focus:outline-none"
          />

          {/* Fullscreen Button */}
          <button
            className="text-white hover:text-gray-300 transition"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
