import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';

export const Timeline = ({ data }) => {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          Our Friendship Journey
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Years that passed, but friendship stayed the same
        </p>
      </div>

      <div className="relative border-l-2 border-rose-500/20 ml-4 sm:ml-32 space-y-12">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-8 sm:pl-10"
          >
            <div className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-600/40">
              <Heart className="h-4 w-4 fill-white" />
            </div>

            <div className="hidden sm:block absolute -left-32 top-1.5 w-24 text-right">
              <span className="text-xs font-semibold text-rose-400 tracking-wider">
                {item.year}
              </span>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-rose-500/20 hover:border-rose-500/40 transition-all">
              <div className="flex items-center gap-2 mb-2 sm:hidden">
                <Calendar className="h-3.5 w-3.5 text-rose-400" />
                <span className="text-xs font-semibold text-rose-400">{item.year}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-medium text-rose-300 border border-rose-500/20">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-rose-100/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
