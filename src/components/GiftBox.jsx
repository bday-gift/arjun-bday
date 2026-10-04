import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GiftBox = ({ onOpenGift }) => {
  const [opened, setOpened] = useState(false);

  const triggerFireworks = () => {
    setOpened(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#e11d48', '#f43f5e', '#ffffff']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#f59e0b', '#fb7185']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#e11d48', '#ffffff']
    });

    setTimeout(() => {
      onOpenGift();
    }, 1500);
  };

  return (
    <section className="py-20 px-4 max-w-xl mx-auto text-center">
      <div className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          Your Surprise Gift
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Touch the magic gift box to reveal your birthday finale!
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerFireworks}
        className="cursor-pointer glass-card-glow rounded-3xl p-12 border border-rose-500/40 relative flex flex-col items-center justify-center group"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 shadow-2xl shadow-rose-600/50"
          >
            <Gift className="h-14 w-14 text-white" />
          </motion.div>
          <Sparkles className="absolute -top-2 -right-2 h-7 w-7 text-amber-300 animate-pulse" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          {opened ? "Unlocking Surprise..." : "Tap to Open Present"}
        </h3>
        <p className="text-xs text-rose-200/80">
          A grand birthday celebration awaits inside
        </p>
      </motion.div>
    </section>
  );
};