import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Brain, Rocket, Target } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface AboutSectionProps {
    onNavigate: (section: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    type TabId = 'story' | 'mission' | 'vision' | 'values';
    const [activeTab, setActiveTab] = useState<TabId>('story');

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const tabs: { id: TabId; label: string; icon: any }[] = [
        { id: 'story', label: 'My Story', icon: User },
        { id: 'mission', label: 'Mission', icon: Target },
        { id: 'vision', label: 'Vision', icon: Rocket },
        { id: 'values', label: 'Values', icon: Brain },
    ];

    const content: Record<TabId, { title: string; text: string }> = {
        story: {
            title: "My Professional Journey",
            text: "Hello! I'm CHOZHARAJAN M, an Application Developer and Full Stack Engineer based in Tamil Nadu, India. With 2 years of intensive experience specializing in scalable MERN stack and Next.js architectures, I've worked at DIGICOGNIT Pvt Ltd since February 2024. I specialize in RegTech (ZATCA/LHDN) and have led cross-functional teams of 3 developers, focusing on code quality and agile practices. My expertise spans complex engineering challenges—from cryptographic security and offline-first architecture to real-time socket integrations."
        },
        mission: {
            title: "Deliver Excellence in Every Project",
            text: "Transform complex business requirements into reliable, scalable solutions. I focus on performance optimization, security implementation, and maintainable code—leveraging advanced technologies like Next.js SSR/SSG, MongoDB aggregation pipelines, and real-time systems to achieve measurable impact."
        },
        vision: {
            title: "Lead Innovation in Full-Stack Development",
            text: "Continue evolving from individual contributor to technical leader—architecting robust systems, implementing DevOps practices, and mentoring developers. I aim to drive innovation in emerging technologies while maintaining high engineering standards and fostering collaborative team environments."
        },
        values: {
            title: "Principles I Work By",
            text: "Passion for code quality and system optimization. Transparent communication and teamwork. Continuous learning and adaptation to new technologies. Lead teams effectively while maintaining technical excellence and agile delivery."
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
            <RobotGuide
                character="beta"
                message="Greetings! I'm BETA, your biographical assistant. Let me introduce CHOZHARAJAN M, an Application Developer and Full Stack Engineer with 2 years of experience specializing in scalable MERN stack and Next.js architectures. This developer has quite an impressive journey - shall we explore their background?"
                isVisible={showGuide}
                onComplete={() => setShowGuide(false)}
                position="right"
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0%', '100%', '0%']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        ABOUT ME
                    </motion.h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Get to know CHOZHARAJAN M - Application Developer and Full Stack Engineer with expertise in MERN stack and Next.js architectures.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm h-full">
                            {/* Avatar */}
                            <motion.div
                                className="w-48 h-48 mx-auto mb-6 relative"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
                                    <User className="w-24 h-24 text-white" />

                                    {/* Scanning effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                                        animate={{ y: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                </div>

                                {/* Status ring */}
                                <motion.div
                                    className="absolute inset-0 border-4 border-green-400 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                />
                            </motion.div>

                            {/* Profile info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">CHOZHARAJAN M</h3>
                                <p className="text-gray-300 mb-4">Application Developer | Full Stack Engineer (MERN)</p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center">
                                        <motion.div
                                            className="text-3xl font-bold text-green-400"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            1.9+
                                        </motion.div>
                                        <div className="text-sm text-gray-400">Years Exp</div>
                                    </div>
                                    <div className="text-center">
                                        <motion.div
                                            className="text-3xl font-bold text-cyan-400"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        >
                                            4+
                                        </motion.div>
                                        <div className="text-sm text-gray-400">Projects</div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onNavigate('contact')}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold transition-all duration-300"
                                >
                                    INITIATE CONTACT
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-sm h-full">
                            {/* Tab Navigation */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <motion.button
                                            key={tab.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                                                ? 'bg-blue-500/30 text-blue-300 border border-blue-400'
                                                : 'bg-gray-700/50 text-gray-400 hover:text-blue-300 hover:bg-blue-500/10'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium">{tab.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Content Display */}
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <h3 className="text-3xl font-bold text-blue-400 mb-4">
                                    {content[activeTab].title}
                                </h3>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {content[activeTab].text}
                                </p>

                                {/* Progress bars */}
                                <div className="space-y-4 mt-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Innovation Index</span>
                                            <span className="text-green-400">95%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '95%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Problem Solving</span>
                                            <span className="text-blue-400">98%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '98%' }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Team Collaboration</span>
                                            <span className="text-purple-400">92%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '92%' }}
                                                transition={{ duration: 1, delay: 0.9 }}
                                                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Next section hint */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20"
                            >
                                <p className="text-cyan-300 text-sm">
                                    <strong>Next:</strong> Ready to see the technical arsenal? The skills matrix awaits...
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
