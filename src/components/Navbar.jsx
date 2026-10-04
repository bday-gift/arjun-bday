import { ChevronLeft, ChevronRight } from 'lucide-react';

const sections = ['welcome', 'timeline', 'gallery', 'letter', 'reasons', 'gift'];

export const Navbar = ({ activeSection, setActiveSection }) => {
  const currentIndex = sections.indexOf(activeSection);

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {currentIndex > 0 && (
        <button
          onClick={goBack}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft />
        </button>
      )}
      {currentIndex < sections.length - 1 && (
        <button
          onClick={goNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30"
        >
          <ChevronRight />
        </button>
      )}
    </>
  );
};
