import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Brain, Rocket, Target } from 'lucide-react';
import RobotGuide from '../RobotGuide';
import newProfileImg from '../../assets/images/NewProfile.png';

interface AboutSectionProps {
    onNavigate: (section: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    type TabId = 'story' | 'mission' | 'vision' | 'values' | 'education';
    const [activeTab, setActiveTab] = useState<TabId>('story');

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);


    const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
        { id: 'story', label: 'My Story', icon: User },
        { id: 'mission', label: 'Mission', icon: Target },
        { id: 'vision', label: 'Vision', icon: Rocket },
        { id: 'values', label: 'Values', icon: Brain },
        { id: 'education', label: 'Education', icon: User },
    ];

    const content: Record<TabId, { title: string; text: string }> = {
        story: {
            title: "My Professional Journey",
            text: "Hello! I'm CHOZHARAJAN M, a Full Stack Engineer with 2+ years shipping production-grade compliance, POS, and AI systems. Specialized in ZATCA/LHDN e-invoicing regulations, RBAC/ABAC authorization, MongoDB performance optimization, and LLM integrations. I currently work at DIGICOGNIT Pvt Ltd as an Application Developer, where I've led engineering teams through Agile sprints, achieved regulatory clearance for compliance systems, and optimized database performance. I delivered zero-penalty deployments while establishing PR review and documentation standards adopted organization-wide."
        },
        mission: {
            title: "Deliver Excellence in Every Project",
            text: "Transform complex business requirements into reliable, scalable solutions. I focus on performance optimization, security implementation, and maintainable code—leveraging advanced technologies like Next.js SSR/SSG, MongoDB aggregation pipelines, and real-time systems to achieve measurable impact. My mission is to continuously improve systems and deliver value to users while maintaining high engineering standards."
        },
        vision: {
            title: "Lead Innovation in Full-Stack Development",
            text: "Continue evolving from individual contributor to technical leader—architecting robust systems, implementing DevOps practices, and mentoring developers. I aim to drive innovation in emerging technologies like AI integration, compliance systems, and low-code platforms while maintaining high engineering standards and fostering collaborative team environments."
        },
        values: {
            title: "Principles I Work By",
            text: "Passion for code quality and system optimization. Transparent communication and teamwork. Continuous learning and adaptation to new technologies. Lead teams effectively while maintaining technical excellence and agile delivery. Focus on delivering production-grade systems with zero-penalty deployments."
        },
        education: {
            title: "Educational Background",
            text: "B.Tech in Information Technology from University College of Engineering, Villupuram - Anna University. Graduated in 2023 with a CGPA of 8.3/10. Strong foundation in software engineering principles, algorithms, and system design that complements my professional experience in building enterprise-grade applications."
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
            <RobotGuide
                character="beta"
                message="Greetings! I'm BETA, your biographical assistant. Let me introduce CHOZHARAJAN M, a Full Stack Engineer with 2+ years of experience in production-grade compliance, POS, and AI systems. This developer specializes in ZATCA/LHDN e-invoicing regulations, RBAC/ABAC authorization, MongoDB performance optimization, and LLM integrations. Shall we explore their background?"
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
                    <h2
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-bg-pos"
                    >
                        ABOUT ME
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Get to know CHOZHARAJAN M - Full Stack Engineer specializing in production-grade compliance, POS, and AI systems.
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
                                    {/* Profile Image - imported as a module for correct Vite bundling */}
                                    <img 
                                        src={newProfileImg} 
                                        alt="CHOZHARAJAN M - Full Stack Engineer"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="%233b82f6"/><path d="M100,60c16.5,0,30,13.5,30,30s-13.5,30-30,30s-30-13.5-30-30S83.5,60,100,60z" fill="%23ffffff"/><path d="M100,140c-33.1,0-60,17.9-60,40h120C160,157.9,133.1,140,100,140z" fill="%23ffffff"/></svg>';
                                        }}
                                    />

                                    {/* Scanning effect - GPU CSS animation */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-pause"
                                    />
                                </div>

                                {/* Status ring - GPU CSS animation */}
                                <div
                                    className="absolute inset-0 border-4 border-green-400 rounded-full animate-spin-slow"
                                />
                            </motion.div>

                            {/* Profile info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">CHOZHARAJAN M</h3>
                                <p className="text-gray-300 mb-4">Full Stack Engineer | AI-Integrated Applications</p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center">
                                        <div
                                            className="text-3xl font-bold text-green-400 animate-pulse-scale"
                                        >
                                            2+
                                        </div>
                                        <div className="text-sm text-gray-400">Years Exp</div>
                                    </div>
                                    <div className="text-center">
                                        <div
                                            className="text-3xl font-bold text-cyan-400 animate-pulse-scale"
                                            style={{ animationDelay: '0.5s' }}
                                        >
                                            7+
                                        </div>
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