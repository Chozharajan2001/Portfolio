import React, { useState, useRef, WheelEvent, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- 1. Your Section Components ---
// You would import your actual section components here.
// For demonstration, we'll create a placeholder section.

const Section = ({ children, id }: { children: React.ReactNode, id: string }) => (
  <section
    id={id}
    className="h-screen w-screen flex flex-col justify-center items-center text-white text-5xl font-bold"
  >
    {children}
  </section>
);

// --- 2. Define Your Sections ---
// Create an array to manage your sections. This makes the logic cleaner.
// Replace these with your actual sections.
const sections = [
  { id: 'home', title: 'Home', component: <Section id="home">Home Section</Section>, color: 'bg-blue-500' },
  { id: 'about', title: 'About', component: <Section id="about">About Me</Section>, color: 'bg-green-500' },
  { id: 'projects', title: 'Projects', component: <Section id="projects">My Projects</Section>, color: 'bg-purple-500' },
  { id: 'contact', title: 'Contact', component: <Section id="contact">Get In Touch</Section>, color: 'bg-red-500' },
];

// --- 3. Navigation Component ---
// This can be your existing top bar. We'll make a side-dot navigator for this example.
// It receives the current index and a function to handle clicks.
const Navbar = ({ currentIndex, onNavClick }: { currentIndex: number, onNavClick: (index: number) => void }) => (
  <nav className="fixed top-1/2 -translate-y-1/2 right-8 z-10">
    <ul className="flex flex-col gap-4">
      {sections.map((section, index) => (
        <li key={section.id}>
          <button
            onClick={() => onNavClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to ${section.title} section`}
          />
        </li>
      ))}
    </ul>
  </nav>
);

// --- 4. Main App Component with Scroll Logic ---
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // The core scroll handling logic
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    // Prevent scrolling if an animation is in progress
    if (isScrolling) return;

    const scrollDown = e.deltaY > 0;

    if (scrollDown) {
      // If not on the last section, scroll down
      if (currentIndex < sections.length - 1) {
        setIsScrolling(true);
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // If not on the first section, scroll up
      if (currentIndex > 0) {
        setIsScrolling(true);
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // A function to handle clicks from the navigation
  const handleNavClick = (index: number) => {
    if (isScrolling || currentIndex === index) return;
    setIsScrolling(true);
    setCurrentIndex(index);
  };

  // Reset the scrolling flag after the animation completes.
  // This acts as a debounce to prevent rapid-fire scroll events.
  useEffect(() => {
    if (isScrolling) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // This duration should be slightly longer than the animation.
    }
    if (!isScrolling) return;

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // This duration should be slightly longer than the animation.

    return () => clearTimeout(timeoutId);
  }, [isScrolling]);

  return (
    // The main container that listens for the scroll wheel event
    <div onWheel={handleWheel} className="h-screen w-full overflow-hidden relative">
      <Navbar currentIndex={currentIndex} onNavClick={handleNavClick} />

      <motion.div
        className="h-full w-full"
        animate={{ y: `-${currentIndex * 100}vh` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {sections.map((section) => (
          <div key={section.id} className={section.color}>
            {section.component}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default App;
