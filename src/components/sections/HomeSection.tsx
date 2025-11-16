import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Zap, Star } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [showGuide, setShowGuide] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const titleTexts = [
    "FULL STACK DEVELOPER (MERN)",
    "REACT | NODE | MONGODB",
    "CLEAN CODE & TESTING",
    "PERFORMANCE OPTIMIZER"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titleTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
      <RobotGuide
        character="alpha"
        message="Welcome to the future! I'm ALPHA, your digital guide. Let me show you around this advanced portfolio system. Ready to explore the capabilities?"
        isVisible={showGuide}
        onComplete={() => setShowGuide(false)}
        position="left"
      />

      <div className="max-w-6xl mx-auto text-center">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "0 0 40px rgba(6, 182, 212, 0.8)",
                "0 0 20px rgba(6, 182, 212, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              CHOZHARAJAN
            </span>
          </motion.h1>
          
          <motion.div 
            className="h-16 flex items-center justify-center"
            key={textIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl text-cyan-300 font-light tracking-wider">
              {titleTexts[textIndex]}
            </h2>
          </motion.div>
        </motion.div>

        {/* Holographic display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mb-12"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 rounded-3xl border border-cyan-500/30 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-6 border-4 border-cyan-400 border-dashed rounded-full flex items-center justify-center"
            >
              <Code className="w-16 h-16 text-cyan-400" />
            </motion.div>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Results-driven MERN developer with 1 year 8 months of hands-on experience building scalable web apps.
              I craft performant React UIs, secure Node/Express APIs, and robust MongoDB schemas—deployed on Vercel/AWS.
              Passionate about clean code, testing, and agile delivery.
            </p>
          </div>

          {/* Floating icons */}
          {[Zap, Star, Code].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: `${20 + index * 20}%`,
                left: `${10 + index * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <Icon className="w-8 h-8 text-cyan-400/60" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('projects')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-lg transition-all duration-300 border border-cyan-400/50"
          >
            EXPLORE PROJECTS
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('about')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30"
          >
            MEET THE DEVELOPER
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onNavigate('about')}
        >
          <span className="text-cyan-400 text-sm mb-2">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </motion.div>
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Scanning lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        
        {/* Corner brackets */}
        <div className="absolute top-24 left-6 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50" />
        <div className="absolute top-24 right-6 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-cyan-400/50" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50" />
      </div>
    </section>
  );
};

export default HomeSection;