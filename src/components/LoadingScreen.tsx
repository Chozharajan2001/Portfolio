import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Eye } from 'lucide-react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            onAnimationComplete={onComplete}
        >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                    {Array.from({ length: 96 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 3
                            }}
                            className="border border-cyan-500/20"
                        />
                    ))}
                </div>
            </div>

            <div className="text-center z-10">
                {/* Main logo/icon */}
                <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full"
                        />
                        <Cpu className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-400" />
                    </div>
                </motion.div>

                {/* Loading text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-4xl font-bold mb-4 text-cyan-400"
                >
                    CHOZHARAJAN M – APPLICATION DEVELOPER
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-cyan-300 mb-8 text-lg"
                >
                    Initializing portfolio systems...
                </motion.p>

                {/* Loading progress */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="h-1 bg-cyan-400 max-w-xs mx-auto mb-4 rounded-full"
                />

                {/* System messages */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-cyan-300/70 text-sm space-y-1"
                >
                    <p>Compiling MERN stack... ✓</p>
                    <p>Initializing Next.js SSR... ✓</p>
                    <p>Activating RegTech systems... ✓</p>
                </motion.div>
            </div>

            {/* Scanning effect */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-70"
            />
        </motion.div>
    );
};

export default LoadingScreen;
