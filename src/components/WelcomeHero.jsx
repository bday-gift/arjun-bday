import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

export const WelcomeHero = ({ onExplore, partnerName = "Arjun" }) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0507] px-6 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl rounded-3xl p-8 sm:p-12 relative border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_80px_rgba(244,63,94,0.15)]"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-1.5 text-[13px] text-rose-300 border border-rose-500/20 mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-rose-400" />
          <span>🎉 A Special Birthday For You ✨</span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95]">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-rose-200 to-rose-400 bg-clip-text text-transparent">{partnerName} 🎂</span>
        </h1>

        <p className="mx-auto max-w-lg mt-6 text-sm sm:text-base text-rose-100/80 leading-relaxed">
          Years of friendship, lots of memories, and now your special day 🥳 This is just a small way to say Happy Birthday, Arjun 🎈🎁
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3.5 mt-8 text-white font-medium shadow-lg shadow-rose-500/25 cursor-pointer"
        >
          <span>Let's Celebrate 🎉</span>
          <Heart className="h-4 w-4 fill-white transition-transform group-hover:scale-110" />
        </motion.button>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
