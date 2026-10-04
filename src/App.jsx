import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { romanticData } from './data/romanticData';
import { BackgroundParticles } from './components/BackgroundParticles';
import { PinScreen } from './components/PinScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeHero } from './components/WelcomeHero';
import { Timeline } from './components/Timeline';
import Gallery from './components/Gallery';
import { LoveLetter } from './components/LoveLetter';
import { LoveCards } from './components/LoveCards';
import { GiftBox } from './components/GiftBox';
import { FinalCelebration } from './components/FinalCelebration';

const sections = ['welcome', 'timeline', 'gallery', 'letter', 'reasons', 'gift'];

export default function App() {
  const [stage, setStage] = useState('pin');
  const [activeSection, setActiveSection] = useState('welcome');

  const handleUnlock = () => setStage('loading');
  const handleLoadingComplete = () => setStage('main');
  const handleOpenGift = () => setStage('final');
  const handleRestart = () => {
    setStage('main');
    setActiveSection('welcome');
  };

  const goNext = () => {
    const idx = sections.indexOf(activeSection);
    if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
  };

  const goBack = () => {
    const idx = sections.indexOf(activeSection);
    if (idx > 0) setActiveSection(sections[idx - 1]);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0205] text-white">
      <BackgroundParticles />

      <AnimatePresence mode="wait">
        {stage === 'pin' && (
          <PinScreen key="pin" correctPin={romanticData.secretPin} onUnlock={handleUnlock} />
        )}

        {stage === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {stage === 'main' && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

            <main className="pb-24">
              {activeSection === 'welcome' && (
                <WelcomeHero partnerName={romanticData.partnerName} onExplore={() => setActiveSection('timeline')} />
              )}
              {activeSection === 'timeline' && <Timeline data={romanticData.timeline} />}
              {activeSection === 'gallery' && <Gallery images={romanticData.galleryImages} />}
              {activeSection === 'letter' && <LoveLetter paragraphs={romanticData.loveLetter} />}
              {activeSection === 'reasons' && <LoveCards reasons={romanticData.loveReasons} />}
              {activeSection === 'gift' && <GiftBox onOpenGift={handleOpenGift} />}
            </main>

            {/* TRANSPARENT ARROWS */}
            {activeSection!== 'welcome' && (
              <button
                onClick={goBack}
                className="fixed left-2 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-md border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
              >
                <span className="text-[26px] -mt-[2px]">‹</span>
              </button>
            )}
            {activeSection!== 'gift' && (
              <button
                onClick={goNext}
                className="fixed right-2 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-md border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all"
              >
                <span className="text-[26px] -mt-[2px]">›</span>
              </button>
            )}

            <MusicPlayer />
          </motion.div>
        )}

        {stage === 'final' && (
          <motion.div key="final" className="relative z-10">
            <FinalCelebration partnerName={romanticData.partnerName} onRestart={handleRestart} />
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
