import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Folder, Mail, Cpu } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isTransitioning: boolean;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange, isTransitioning }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onSectionChange('home')}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <span className="text-xl font-bold text-cyan-400">ROBO.FOLIO</span>
          </motion.div>

          {/* Navigation items */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSectionChange(item.id)}
                  disabled={isTransitioning}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                      : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:block text-sm font-medium">{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 border border-cyan-400 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ 
                opacity: [1, 0.5, 1],
                scale: [1, 1.1, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-xs text-green-400 hidden sm:block">AI ONLINE</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;