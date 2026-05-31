import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Folder, Mail, Cpu, Menu, X } from 'lucide-react';

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

const Navigation: React.FC<NavigationProps> = memo(({ currentSection, onSectionChange, isTransitioning }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (sectionId: string) => {
        onSectionChange(sectionId);
        setIsOpen(false);
    };

    return (
        <>
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
                            onClick={() => handleNavClick('home')}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                                <Cpu className="w-8 h-8 text-cyan-400" />
                            </motion.div>
                            <span className="text-xl font-bold text-cyan-400">CHOZHARAJAN M</span>
                        </motion.div>

                        {/* Navigation items - Desktop */}
                        <div className="hidden md:flex space-x-1">
                            {navItems.map((item) => {
                                const isActive = currentSection === item.id;
                                const Icon = item.icon;

                                return (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavClick(item.id)}
                                        disabled={isTransitioning}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${isActive
                                            ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20'
                                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{item.label}</span>

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

                        {/* Right Section (Hamburger + Status) */}
                        <div className="flex items-center space-x-4">
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

                            {/* Hamburger Button (Mobile) */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                                aria-label="Toggle Menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md pt-24 px-6 flex flex-col justify-start space-y-6 md:hidden"
                    >
                        {/* Background glowing effects for premium design */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col space-y-4 z-10 w-full max-w-md mx-auto">
                            {navItems.map((item, index) => {
                                const isActive = currentSection === item.id;
                                const Icon = item.icon;

                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleNavClick(item.id)}
                                        disabled={isTransitioning}
                                        className={`w-full p-4 rounded-xl flex items-center space-x-4 border transition-all duration-300 ${isActive
                                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/10'
                                            : 'bg-gray-800/40 text-gray-400 border-gray-700/50 hover:text-cyan-300 hover:border-cyan-500/30'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-700/50 text-gray-400'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-lg font-semibold">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

export default Navigation;
