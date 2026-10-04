import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const musicSrc =  "/arjun-bday.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={musicSrc} loop />
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-2 rounded-full p-3 transition-all glass-card border border-rose-500/30 shadow-xl ${
          isPlaying ? 'bg-rose-600/30 text-rose-300' : 'bg-black/40 text-rose-400'
        }`}
        title="Toggle Background Music"
      >
        <Music className={`h-5 w-5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-pink-400" />
        ) : (
          <VolumeX className="h-4 w-4 opacity-70" />
        )}
        <span className="hidden group-hover:inline text-xs pr-1 font-medium text-rose-200">
          {isPlaying ? 'Music On' : 'Play Song'}
        </span>
      </button>
    </div>
  );
};
