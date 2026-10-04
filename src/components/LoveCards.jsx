import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Shield, Crown, Sparkles, Gem } from 'lucide-react';

const icons = [Star, Zap, Shield, Crown, Gem, Sparkles];

export const LoveCards = ({ reasons }) => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          A Few Things That Make You Special
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Some honest words for a friend I have known since nursery
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reasons.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6 bg-[#1a1016] border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Icon className="h-5 w-5 text-rose-400" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-rose-200/70 leading-relaxed">{item.text}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/10 flex justify-between items-center text-[10px] text-rose-400/60">
                <span>Reason #{idx + 1}</span>
                <Sparkles className="h-3 w-3" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
