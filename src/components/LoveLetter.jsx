import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, RefreshCw } from 'lucide-react';

export const LoveLetter = ({ paragraphs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const fullText = paragraphs.join('\n\n');

  useEffect(() => {
    if (!isOpen) return;

    let idx = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 70); // <-- SPEED YAHAN HAI: 25=fast, 70=slow, 110=aur slow

    return () => clearInterval(interval);
  }, [isOpen, fullText]);

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          A Letter From My Heart
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Touch the envelope to unlock my words for you
        </p>
      </div>

      {!isOpen? (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer glass-card-glow rounded-3xl p-10 text-center border border-rose-500/30 flex flex-col items-center justify-center gap-4 group"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-xl shadow-rose-600/30 group-hover:scale-110 transition-transform">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">Click to Open Envelope</h3>
          <p className="text-xs text-rose-300/80">Sealed with infinite affection 💌</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-rose-500/30 relative"
        >
          <div className="flex items-center justify-between mb-6 border-b border-rose-500/20 pb-4">
            <div className="flex items-center gap-2">
              <MailOpen className="h-5 w-5 text-rose-400" />
              <span className="font-serif text-sm text-rose-200 font-semibold">Written For You</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-rose-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-seal
            </button>
          </div>

          <div className="font-serif text-sm sm:text-base leading-relaxed text-rose-100 whitespace-pre-line min-h-[250px]">
            {displayedText}
            {displayedText.length < fullText.length && (
              <span className="inline-block w-1.5 h-4 bg-rose-400 ml-1 animate-pulse" />
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};
