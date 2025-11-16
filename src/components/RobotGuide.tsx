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
};

const RobotGuide: React.FC<RobotGuideProps> = ({ 
  character, 
  message, 
  isVisible, 
  onComplete,
  position = 'left' 
}) => {
  const robot = robotCharacters[character];
  const Icon = robot.icon;

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
          className={`fixed ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 z-30 max-w-sm`}
          onAnimationComplete={() => {
            if (onComplete) {
              setTimeout(onComplete, 3000);
            }
          }}
        >
          {/* Robot body */}
          <motion.div
            className={`relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 border-${robot.color}-500/50 shadow-2xl shadow-${robot.color}-500/20`}
            animate={{ 
              boxShadow: [
                `0 0 20px rgb(0 255 255 / 0.2)`,
                `0 0 40px rgb(0 255 255 / 0.4)`,
                `0 0 20px rgb(0 255 255 / 0.2)`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Robot head */}
            <div className="flex items-start space-x-4">
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br from-${robot.color}-400 to-${robot.color}-600 rounded-xl flex items-center justify-center relative overflow-hidden`}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon className="w-8 h-8 text-white" />
                
                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                
                {/* Glowing dots */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full">
                  <motion.div
                    className="w-full h-full bg-green-400 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  className={`text-${robot.color}-400 font-bold text-lg mb-2`}
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
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Circuit pattern */}
            <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            
            {/* Status indicators */}
            <div className="absolute top-2 right-2 flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 h-1.5 bg-${robot.color}-400 rounded-full`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Speech bubble pointer */}
          <div className={`absolute top-8 ${position === 'left' ? '-right-2' : '-left-2'} w-4 h-4 bg-gray-800 transform rotate-45 border-${robot.color}-500/50 ${position === 'left' ? 'border-r border-b' : 'border-l border-t'}`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RobotGuide;