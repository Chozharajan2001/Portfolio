import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
    // Memoize particle positions to prevent recalculation on every render
    const particles = useMemo(() => {
        return Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            finalX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            finalY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            duration: Math.random() * 20 + 10,
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0" style={{ willChange: 'transform' }}>
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Animated grid - static SVG, no animation needed */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="cyan" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles - reduced from 20 to 10 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
          style={{ willChange: 'transform' }}
          initial={{
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            x: particle.finalX,
            y: particle.finalY,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}

      {/* Glowing orbs - optimized with CSS will-change */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Circuit lines - simplified animation */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,100 Q200,50 400,100 T800,100 L800,200 Q600,150 400,200 T0,200 Z"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          style={{ willChange: 'stroke-dashoffset' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="cyan" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default React.memo(AnimatedBackground);
