import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap, Eye, Cpu } from 'lucide-react';


interface RobotGuideProps {
    character: 'alpha' | 'beta' | 'gamma' | 'delta' | 'omega';
    message: string;
    isVisible: boolean;
    onComplete?: () => void;
    position?: 'left' | 'right';
}

const robotCharacters = {
    alpha: { color: 'cyan', icon: Eye, name: 'ALPHA' },
    beta: { color: 'blue', icon: Cpu, name: 'BETA' },
    gamma: { color: 'purple', icon: Zap, name: 'GAMMA' },
    delta: { color: 'green', icon: MessageCircle, name: 'DELTA' },
    omega: { color: 'orange', icon: Eye, name: 'OMEGA' },
} as const;

const colorGlows = {
    cyan: 'rgba(6, 182, 212, 0.2)',
    blue: 'rgba(59, 130, 246, 0.2)',
    purple: 'rgba(168, 85, 247, 0.2)',
    green: 'rgba(34, 197, 94, 0.2)',
    orange: 'rgba(249, 115, 22, 0.2)',
} as const;

const colorGlowsPeak = {
    cyan: 'rgba(6, 182, 212, 0.4)',
    blue: 'rgba(59, 130, 246, 0.4)',
    purple: 'rgba(168, 85, 247, 0.4)',
    green: 'rgba(34, 197, 94, 0.4)',
    orange: 'rgba(249, 115, 22, 0.4)',
} as const;

const getRobotStyles = (color: 'cyan' | 'blue' | 'purple' | 'green' | 'orange') => {
    switch (color) {
        case 'cyan':
            return {
                border: 'border-cyan-500/50',
                fromTo: 'from-cyan-400 to-cyan-600',
                text: 'text-cyan-400',
                dot: 'bg-cyan-400',
            };
        case 'blue':
            return {
                border: 'border-blue-500/50',
                fromTo: 'from-blue-400 to-blue-600',
                text: 'text-blue-400',
                dot: 'bg-blue-400',
            };
        case 'purple':
            return {
                border: 'border-purple-500/50',
                fromTo: 'from-purple-400 to-purple-600',
                text: 'text-purple-400',
                dot: 'bg-purple-400',
            };
        case 'green':
            return {
                border: 'border-green-500/50',
                fromTo: 'from-green-400 to-green-600',
                text: 'text-green-400',
                dot: 'bg-green-400',
            };
        case 'orange':
            return {
                border: 'border-orange-500/50',
                fromTo: 'from-orange-400 to-orange-600',
                text: 'text-orange-400',
                dot: 'bg-orange-400',
            };
        default:
            return {
                border: 'border-gray-500/50',
                fromTo: 'from-gray-400 to-gray-600',
                text: 'text-gray-400',
                dot: 'bg-gray-400',
            };
    }
};

const RobotGuide: React.FC<RobotGuideProps> = React.memo(({
    character,
    message,
    isVisible,
    onComplete,
    position = 'left'
}) => {
    const robot = robotCharacters[character];
    const Icon = robot.icon;
    const styles = getRobotStyles(robot.color);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{
                        x: position === 'left' ? -300 : 300,
                        y: 50,
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        x: position === 'left' ? 20 : -20,
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{
                        x: position === 'left' ? -300 : 300,
                        opacity: 0,
                        scale: 0.8
                    }}
                    transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 20,
                        duration: 0.8 
                    }}
                    className={`fixed ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 z-30 max-w-sm hidden md:block`}
                    onAnimationComplete={() => {
                        if (onComplete) {
                            setTimeout(onComplete, 3000);
                        }
                    }}
                >
                    {/* Robot body - optimized with GPU CSS dynamic glow */}
                    <div
                        className={`relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 ${styles.border} shadow-2xl animate-robot-glow`}
                        style={{
                            '--robot-glow-color': colorGlows[robot.color],
                            '--robot-glow-color-peak': colorGlowsPeak[robot.color]
                        } as React.CSSProperties}
                    >
                        {/* Robot head */}
                        <div className="flex items-start space-x-4">
                            <div
                                className={`w-16 h-16 bg-gradient-to-br ${styles.fromTo} rounded-xl flex items-center justify-center relative overflow-hidden animate-robot-scale`}
                            >
                                <Icon className="w-8 h-8 text-white" />

                                {/* Scanning line effect - GPU CSS animation */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan-pause"
                                />

                                {/* Glowing dots - CSS pulse */}
                                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full">
                                    <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <motion.h3
                                    className={`${styles.text} font-bold text-lg mb-2`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {robot.name}
                                </motion.h3>

                                <motion.p
                                    className="text-gray-300 text-sm leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {message}
                                </motion.p>
                            </div>
                        </div>

                        {/* Holographic effect overlay */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse pointer-events-none"
                        />

                        {/* Circuit pattern */}
                        <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                        {/* Status indicators - GPU CSS animation */}
                        <div className="absolute top-2 right-2 flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 ${styles.dot} rounded-full animate-pulse`}
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Speech bubble pointer */}
                    <div className={`absolute top-8 ${position === 'left' ? '-right-2' : '-left-2'} w-4 h-4 bg-gray-800 transform rotate-45 ${styles.border} ${position === 'left' ? 'border-r border-b' : 'border-l border-t'}`} />
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default RobotGuide;
