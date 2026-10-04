import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart, KeyRound, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const PinScreen = ({ correctPin, onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleKeyPress = (num) => {
    sounds.playKeypress();
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === correctPin) {
          sounds.playSuccess();
          setIsUnlocked(true);
          setTimeout(() => {
            onUnlock();
          }, 1200);
        } else {
          sounds.playError();
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleBackspace = () => {
    sounds.playKeypress();
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0205] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-romantic-burgundy/40 via-[#0b0205] to-[#0b0205] p-4"
    >
      <motion.div 
        animate={error ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm glass-card-glow rounded-3xl p-8 text-center shadow-2xl border border-rose-500/20"
      >
        {/* Decorative Top Heart Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-600/30">
          {isUnlocked ? (
            <Sparkles className="h-8 w-8 text-white animate-spin" />
          ) : (
            <Lock className="h-8 w-8 text-white" />
          )}
        </div>

        <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
          Private Access
        </h2>
        <p className="mt-2 text-xs text-rose-200/70">
          Enter the secret PIN to open your birthday surprise
        </p>

        {/* PIN Indicators */}
        <div className="my-8 flex justify-center gap-4">
          {[0, 1, 2, 3].map((idx) => {
            const filled = pin.length > idx;
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: filled ? [1, 1.25, 1] : 1,
                  borderColor: error ? '#f43f5e' : filled ? '#fb7185' : 'rgba(255,255,255,0.2)'
                }}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all ${
                  filled 
                    ? 'bg-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                    : 'bg-black/30 text-transparent'
                }`}
              >
                {filled ? <Heart className="h-5 w-5 fill-rose-500 text-rose-500" /> : '•'}
              </motion.div>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-xs font-semibold text-rose-400 animate-pulse">
            Incorrect passcode. Hint: Birthday  date (2026)
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="flex h-12 items-center justify-center rounded-xl bg-white/5 font-sans text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-rose-600/30 active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPin('')}
            className="flex h-12 items-center justify-center rounded-xl bg-white/5 text-xs text-rose-300 transition-all hover:bg-white/10"
          >
            Clear
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="flex h-12 items-center justify-center rounded-xl bg-white/5 font-sans text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-rose-600/30 active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="flex h-12 items-center justify-center rounded-xl bg-white/5 text-xs text-rose-300 transition-all hover:bg-white/10"
          >
            ⌫
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
