
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';

// Lazy load section components for code splitting
const HomeSection = lazy(() => import('./components/sections/HomeSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

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

    const handleSectionChange = async (newSection: string) => {
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
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
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
        // Loading fallback for lazy-loaded sections
        const LoadingFallback = () => (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
                />
            </div>
        );

        switch (currentSection) {
            case 'home':
                return <Suspense fallback={<LoadingFallback />}><HomeSection onNavigate={handleSectionChange} /></Suspense>;
            case 'about':
                return <Suspense fallback={<LoadingFallback />}><AboutSection onNavigate={handleSectionChange} /></Suspense>;
            case 'skills':
                return <Suspense fallback={<LoadingFallback />}><SkillsSection onNavigate={handleSectionChange} /></Suspense>;
            case 'projects':
                return <Suspense fallback={<LoadingFallback />}><ProjectsSection onNavigate={handleSectionChange} /></Suspense>;
            case 'contact':
                return <Suspense fallback={<LoadingFallback />}><ContactSection onNavigate={handleSectionChange} /></Suspense>;
            default:
                return <Suspense fallback={<LoadingFallback />}><HomeSection onNavigate={handleSectionChange} /></Suspense>;
        }
    };

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    const currentIndex = sections.indexOf(currentSection);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Skip to main content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg"
            >
                Skip to main content
            </a>

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
                            title={sectionTitles[section as keyof typeof sectionTitles]}
                            aria-label={`Navigate to ${sectionTitles[section as keyof typeof sectionTitles]} section`}
                            aria-current={currentSection === section ? 'true' : undefined}
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
                    id="main-content"
                    role="main"
                    aria-label={`Section: ${sectionTitles[currentSection as keyof typeof sectionTitles]}`}
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
