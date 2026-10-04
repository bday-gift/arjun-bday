import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const messages = [
    "Unlocking sweet memories...",
    "Arranging fresh digital roses...",
    "Tuning romantic melodies...",
    "Preparing your birthday celebration..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length);
    }, 900);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0205] p-6 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-600/20 shadow-[0_0_50px_rgba(225,29,72,0.4)]"
        >
          <Heart className="h-12 w-12 fill-rose-500 text-rose-500" />
        </motion.div>
      </div>

      <h3 className="font-serif text-xl font-medium text-white mb-2">
        Crafting Magic Just For You
      </h3>
      
      <p className="h-6 text-sm text-rose-300/80 font-sans transition-all duration-300">
        {messages[textIndex]}
      </p>

      {/* Progress Bar Container */}
      <div className="mt-8 w-64 max-w-xs rounded-full bg-white/10 p-1 backdrop-blur-md border border-white/10">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 shadow-[0_0_10px_#f43f5e]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-2 text-xs text-rose-400/60 font-mono">{progress}%</span>
    </motion.div>
  );
};