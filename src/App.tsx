// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navigation from './components/Navigation';
// import HomeSection from './components/sections/HomeSection';
// import AboutSection from './components/sections/AboutSection';
// import SkillsSection from './components/sections/SkillsSection';
// import ProjectsSection from './components/sections/ProjectsSection';
// import ContactSection from './components/sections/ContactSection';
// import AnimatedBackground from './components/AnimatedBackground';
// import LoadingScreen from './components/LoadingScreen';

// const sections = ['home', 'about', 'skills', 'projects', 'contact'];

// function App() {
//   const [currentSection, setCurrentSection] = useState('home');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [scrollTimeout, setScrollTimeout] = useState(null);
//   const [lastScrollTime, setLastScrollTime] = useState(0);

//   useEffect(() => {
//     // Simulate loading time
//     const timer = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSectionChange = async (newSection, fromScroll = false) => {
//     if (newSection === currentSection || isTransitioning) return;

//     // If this is from scroll, prevent rapid transitions
//     if (fromScroll) {
//       const now = Date.now();
//       if (now - lastScrollTime < 1000) return; // Throttle scroll transitions
//       setLastScrollTime(now);
//     }

//     setIsTransitioning(true);

//     // Add transition delay
//     setTimeout(() => {
//       setCurrentSection(newSection);
//       setIsTransitioning(false);
//     }, 800);
//   };

//   const handleScroll = useCallback((e) => {
//     if (isTransitioning || isLoading) return;

//     // Get the main content container
//     const mainContent = document.querySelector('.section-content');
//     if (!mainContent) return;

//     const { scrollTop, scrollHeight, clientHeight } = mainContent;
//     const isAtTop = scrollTop === 0;
//     const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5; // 5px threshold for precision

//     // Only trigger section change if:
//     // 1. Scrolling up and already at the top of current section
//     // 2. Scrolling down and already at the bottom of current section
//     const shouldChangeSection =
//       (e.deltaY < 0 && isAtTop) ||  // Scroll up at top
//       (e.deltaY > 0 && isAtBottom); // Scroll down at bottom

//     if (!shouldChangeSection) return;

//     // Clear existing timeout
//     if (scrollTimeout) {
//       clearTimeout(scrollTimeout);
//     }

//     // Set new timeout to handle section change
//     const newTimeout = setTimeout(() => {
//       const currentIndex = sections.indexOf(currentSection);
//       let nextSection;

//       if (e.deltaY > 0 && isAtBottom) {
//         // Scrolling down from bottom - next section
//         nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : currentSection;
//       } else if (e.deltaY < 0 && isAtTop) {
//         // Scrolling up from top - previous section
//         nextSection = currentIndex > 0 ? sections[currentIndex - 1] : currentSection;
//       }

//       if (nextSection !== currentSection) {
//         handleSectionChange(nextSection, true);
//       }
//     }, 150); // Slightly longer delay for better UX

//     setScrollTimeout(newTimeout);
//   }, [currentSection, isTransitioning, isLoading, scrollTimeout]);

//   // Keyboard navigation
//   const handleKeyPress = useCallback((e) => {
//     if (isTransitioning || isLoading) return;

//     const currentIndex = sections.indexOf(currentSection);
//     let nextSection;

//     switch (e.key) {
//       case 'ArrowDown':
//       case ' ': // Spacebar
//         e.preventDefault();
//         nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : currentSection;
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         nextSection = currentIndex > 0 ? sections[currentIndex - 1] : currentSection;
//         break;
//       case 'Home':
//         e.preventDefault();
//         nextSection = 'home';
//         break;
//       case 'End':
//         e.preventDefault();
//         nextSection = 'contact';
//         break;
//       default:
//         return;
//     }

//     if (nextSection !== currentSection) {
//       handleSectionChange(nextSection, true);
//     }
//   }, [currentSection, isTransitioning, isLoading]);

//   // Touch/swipe handling for mobile - only at content boundaries
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientY);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientY);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isUpSwipe = distance > 100; // Increased threshold
//     const isDownSwipe = distance < -100;

//     if (isUpSwipe || isDownSwipe) {
//       // Check if at content boundaries before allowing swipe navigation
//       const mainContent = document.querySelector('.section-content');
//       if (!mainContent) return;

//       const { scrollTop, scrollHeight, clientHeight } = mainContent;
//       const isAtTop = scrollTop === 0;
//       const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

//       const shouldChangeSection =
//         (isDownSwipe && isAtTop) || // Swipe down at top
//         (isUpSwipe && isAtBottom);  // Swipe up at bottom

//       if (!shouldChangeSection) return;

//       const currentIndex = sections.indexOf(currentSection);
//       let nextSection;

//       if (isUpSwipe && isAtBottom) {
//         // Swiping up from bottom - go to next section
//         nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : currentSection;
//       } else if (isDownSwipe && isAtTop) {
//         // Swiping down from top - go to previous section
//         nextSection = currentIndex > 0 ? sections[currentIndex - 1] : currentSection;
//       }

//       if (nextSection !== currentSection) {
//         handleSectionChange(nextSection, true);
//       }
//     }
//   };

//   useEffect(() => {
//     // Add event listeners
//     window.addEventListener('wheel', handleScroll, { passive: false });
//     window.addEventListener('keydown', handleKeyPress);
//     window.addEventListener('touchstart', handleTouchStart, { passive: true });
//     window.addEventListener('touchmove', handleTouchMove, { passive: true });
//     window.addEventListener('touchend', handleTouchEnd, { passive: true });

//     return () => {
//       // Cleanup
//       window.removeEventListener('wheel', handleScroll);
//       window.removeEventListener('keydown', handleKeyPress);
//       window.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);

//       if (scrollTimeout) {
//         clearTimeout(scrollTimeout);
//       }
//     };
//   }, [handleScroll, handleKeyPress, scrollTimeout]);

//   const renderCurrentSection = () => {
//     switch (currentSection) {
//       case 'home':
//         return <HomeSection onNavigate={handleSectionChange} />;
//       case 'about':
//         return <AboutSection onNavigate={handleSectionChange} />;
//       case 'skills':
//         return <SkillsSection onNavigate={handleSectionChange} />;
//       case 'projects':
//         return <ProjectsSection onNavigate={handleSectionChange} />;
//       case 'contact':
//         return <ContactSection onNavigate={handleSectionChange} />;
//       default:
//         return <HomeSection onNavigate={handleSectionChange} />;
//     }
//   };

//   if (isLoading) {
//     return <LoadingScreen onComplete={() => setIsLoading(false)} />;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden relative">
//       <AnimatedBackground />

//       {/* Section indicator dots */}
//       <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
//         {sections.map((section, index) => (
//           <button
//             key={section}
//             onClick={() => handleSectionChange(section)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentSection === section
//                 ? 'bg-cyan-400 scale-125'
//                 : 'bg-white/30 hover:bg-white/50'
//             }`}
//             title={section.charAt(0).toUpperCase() + section.slice(1)}
//           />
//         ))}
//       </div>

//       <Navigation
//         currentSection={currentSection}
//         onSectionChange={handleSectionChange}
//         isTransitioning={isTransitioning}
//       />

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSection}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 section-content h-screen overflow-y-auto"
//         >
//           {renderCurrentSection()}
//         </motion.div>
//       </AnimatePresence>

//       {/* Scanning beam transition effect */}
//       <AnimatePresence>
//         {isTransitioning && (
//           <motion.div
//             initial={{ x: '-100%', opacity: 0 }}
//             animate={{ x: '100%', opacity: 1 }}
//             exit={{ x: '200%', opacity: 0 }}
//             transition={{ duration: 0.8, ease: 'easeInOut' }}
//             className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-50 pointer-events-none"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Scroll hint */}
//       <AnimatePresence>
//         {currentSection === 'home' && !isTransitioning && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ delay: 2, duration: 0.5 }}
//             className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
//           >
//             <div className="flex flex-col items-center text-white/60 text-sm">
//               <span>Scroll to explore</span>
//               <motion.div
//                 animate={{ y: [0, 5, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 className="mt-2"
//               >
//                 ↓
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';

const sections = ['home', 'about', 'skills', 'projects', 'contact'];
const sectionTitles = {
    home: 'Home',
    about: 'About Me',
    skills: 'Technical Expertise',
    projects: 'Projects',
    contact: 'Contact'
};

function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isLoading, setIsLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSectionChange = async (newSection) => {
        if (newSection === currentSection || isTransitioning) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentSection(newSection);
            setIsTransitioning(false);
        }, 800);
    };

    const goToNextSection = () => {
        const currentIndex = sections.indexOf(currentSection);
        const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : sections[0];
        handleSectionChange(nextSection);
    };

    const goToPrevSection = () => {
        const currentIndex = sections.indexOf(currentSection);
        const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : sections[sections.length - 1];
        handleSectionChange(prevSection);
    };

    // Keyboard navigation
    const handleKeyPress = useCallback((e) => {
        if (isTransitioning || isLoading) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
                e.preventDefault();
                goToNextSection();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                goToPrevSection();
                break;
            case 'Home':
                e.preventDefault();
                handleSectionChange('home');
                break;
            case 'End':
                e.preventDefault();
                handleSectionChange('contact');
                break;
            default:
                break;
        }
    }, [currentSection, isTransitioning, isLoading]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'home':
                return <HomeSection onNavigate={handleSectionChange} />;
            case 'about':
                return <AboutSection onNavigate={handleSectionChange} />;
            case 'skills':
                return <SkillsSection onNavigate={handleSectionChange} />;
            case 'projects':
                return <ProjectsSection onNavigate={handleSectionChange} />;
            case 'contact':
                return <ContactSection onNavigate={handleSectionChange} />;
            default:
                return <HomeSection onNavigate={handleSectionChange} />;
        }
    };

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    const currentIndex = sections.indexOf(currentSection);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            <AnimatedBackground />

            {/* Section indicator dots - positioned at bottom center */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
                <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                    {sections.map((section, index) => (
                        <button
                            key={section}
                            onClick={() => handleSectionChange(section)}
                            disabled={isTransitioning}
                            className={`relative group transition-all duration-300 ${currentSection === section
                                ? 'w-4 h-4'
                                : 'w-3 h-3 hover:w-3.5 hover:h-3.5'
                                }`}
                            title={sectionTitles[section]}
                        >
                            <div className={`w-full h-full rounded-full transition-all duration-300 ${currentSection === section
                                ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                                : 'bg-white/40 group-hover:bg-white/70'
                                }`} />

                            {/* Progress ring for current section */}
                            {currentSection === section && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation buttons - positioned on sides */}
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
                {/* Previous button */}
                <button
                    onClick={goToPrevSection}
                    disabled={isTransitioning}
                    className="absolute -left-96 top-1/2 transform -translate-y-1/2 pointer-events-auto group disabled:opacity-50"
                    title="Previous section"
                >
                    <div className="flex items-center justify-center w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/20">
                        <svg className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </button>

                {/* Next button */}
                <button
                    onClick={goToNextSection}
                    disabled={isTransitioning}
                    className="absolute -right-96 top-1/2 transform -translate-y-1/2 pointer-events-auto group disabled:opacity-50"
                    title="Next section"
                >
                    <div className="flex items-center justify-center w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/20">
                        <svg className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* Mobile floating navigation */}
            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40 flex flex-col space-y-3 md:hidden">
                <button
                    onClick={goToPrevSection}
                    disabled={isTransitioning}
                    className="flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 group disabled:opacity-50"
                    title="Previous section"
                >
                    <svg className="w-4 h-4 text-white group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>

                <div className="flex flex-col space-y-2">
                    {sections.map((section, index) => (
                        <button
                            key={section}
                            onClick={() => handleSectionChange(section)}
                            disabled={isTransitioning}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSection === section
                                    ? 'bg-cyan-400 scale-125'
                                    : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNextSection}
                    disabled={isTransitioning}
                    className="flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 group disabled:opacity-50"
                    title="Next section"
                >
                    <svg className="w-4 h-4 text-white group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <Navigation
                currentSection={currentSection}
                onSectionChange={handleSectionChange}
                isTransitioning={isTransitioning}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 h-screen overflow-y-auto"
                >
                    {renderCurrentSection()}
                </motion.div>
            </AnimatePresence>

            {/* Scanning beam transition effect */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '100%', opacity: 1 }}
                        exit={{ x: '200%', opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-50 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Keyboard shortcuts hint */}
            <div className="fixed bottom-4 right-4 z-30 text-xs text-white/40 hidden lg:block">
                Use arrow keys or space to navigate
            </div>
        </div>
    );
}

export default App;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navigation from './components/Navigation';
// import HomeSection from './components/sections/HomeSection';
// import AboutSection from './components/sections/AboutSection';
// import SkillsSection from './components/sections/SkillsSection';
// import ProjectsSection from './components/sections/ProjectsSection';
// import ContactSection from './components/sections/ContactSection';
// import AnimatedBackground from './components/AnimatedBackground';
// import LoadingScreen from './components/LoadingScreen';

// const sections = ['home', 'about', 'skills', 'projects', 'contact'];

// function App() {
//   const [currentSection, setCurrentSection] = useState('home');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     // Simulate loading time
//     const timer = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSectionChange = async (newSection: string) => {
//     if (newSection === currentSection || isTransitioning) return;

//     setIsTransitioning(true);

//     // Add transition delay
//     setTimeout(() => {
//       setCurrentSection(newSection);
//       setIsTransitioning(false);
//     }, 800);
//   };

//   const renderCurrentSection = () => {
//     switch (currentSection) {
//       case 'home':
//         return <HomeSection onNavigate={handleSectionChange} />;
//       case 'about':
//         return <AboutSection onNavigate={handleSectionChange} />;
//       case 'skills':
//         return <SkillsSection onNavigate={handleSectionChange} />;
//       case 'projects':
//         return <ProjectsSection onNavigate={handleSectionChange} />;
//       case 'contact':
//         return <ContactSection onNavigate={handleSectionChange} />;
//       default:
//         return <HomeSection onNavigate={handleSectionChange} />;
//     }
//   };

//   if (isLoading) {
//     return <LoadingScreen onComplete={() => setIsLoading(false)} />;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden relative">
//       <AnimatedBackground />

//       <Navigation
//         currentSection={currentSection}
//         onSectionChange={handleSectionChange}
//         isTransitioning={isTransitioning}
//       />

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSection}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10"
//         >
//           {renderCurrentSection()}
//         </motion.div>
//       </AnimatePresence>

//       {/* Scanning beam transition effect */}
//       <AnimatePresence>
//         {isTransitioning && (
//           <motion.div
//             initial={{ x: '-100%', opacity: 0 }}
//             animate={{ x: '100%', opacity: 1 }}
//             exit={{ x: '200%', opacity: 0 }}
//             transition={{ duration: 0.8, ease: 'easeInOut' }}
//             className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-50 pointer-events-none"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;
