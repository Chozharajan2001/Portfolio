import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Palette, Cog, Zap, Shield } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface SkillsSectionProps {
    onNavigate: (section: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    type CategoryId = 'frontend' | 'backend' | 'devops' | 'tools' | 'regtech' | 'devtools';
    const [activeCategory, setActiveCategory] = useState<CategoryId>('frontend');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);

    type Skill = { name: string; level: number; description: string };
    type SkillCategory = { title: string; icon: any; color: string; skills: Skill[] };

    const skillCategories: Record<CategoryId, SkillCategory> = {
        frontend: {
            title: 'Frontend Engineering',
            icon: Palette,
            color: 'cyan',
            skills: [
                { name: 'React.js', level: 95, description: 'Component architecture & state management' },
                { name: 'Next.js (SSR/SSG)', level: 90, description: 'Server-side rendering and static generation' },
                { name: 'Zustand', level: 85, description: 'State management solution' },
                { name: 'Context API', level: 88, description: 'Global state management' },
                { name: 'Ant Design / Material UI', level: 85, description: 'UI libraries & design systems' },
                { name: 'SCSS', level: 84, description: 'Advanced styling with modules' },
                { name: 'Responsive Web Design', level: 90, description: 'Mobile-first, adaptive layouts' },
                { name: 'Performance Tuning (useMemo, React.memo)', level: 88, description: 'Rendering optimization techniques' },
            ]
        },
        backend: {
            title: 'Backend Architecture',
            icon: Database,
            color: 'blue',
            skills: [
                { name: 'Node.js', level: 92, description: 'Runtime environment' },
                { name: 'Express.js', level: 90, description: 'Web application framework' },
                { name: 'Fastify', level: 75, description: 'High-performance web framework' },
                { name: 'RESTful APIs', level: 90, description: 'API design and implementation' },
                { name: 'GraphQL (Basic)', level: 65, description: 'Query language for APIs' },
                { name: 'Microservices Architecture', level: 80, description: 'Decentralized system design' },
                { name: 'Server-Side Rendering (SSR)', level: 85, description: 'Rendering on the server' },
            ]
        },
        devops: {
            title: 'Real-Time Systems',
            icon: Cog,
            color: 'green',
            skills: [
                { name: 'WebSockets (Socket.io)', level: 85, description: 'Real-time bidirectional communication' },
                { name: 'Event-Driven Architecture', level: 80, description: 'Asynchronous event handling' },
                { name: 'Live Dashboarding', level: 75, description: 'Real-time data visualization' },
            ]
        },
        tools: {
            title: 'Database & Security',
            icon: Code,
            color: 'purple',
            skills: [
                { name: 'MongoDB', level: 90, description: 'NoSQL database management' },
                { name: 'Mongoose', level: 88, description: 'ODM for MongoDB' },
                { name: 'Advanced Aggregation Pipelines', level: 85, description: 'Complex data processing' },
                { name: 'Database Indexing', level: 82, description: 'Performance optimization' },
                { name: 'Transaction Management', level: 80, description: 'ACID compliance' },
                { name: 'JWT', level: 88, description: 'Token-based authentication' },
                { name: 'Argon2', level: 85, description: 'Password hashing algorithm' },
                { name: 'Bcrypt', level: 85, description: 'Password hashing' },
                { name: 'OpenSSL', level: 80, description: 'Cryptographic toolkit' },
                { name: 'Crypto-js', level: 78, description: 'JavaScript cryptography' },
                { name: 'XML Canonicalization', level: 75, description: 'Standardizing XML documents' },
                { name: 'UBL 2.1 Standards', level: 75, description: 'Universal Business Language' },
                { name: 'Role-Based Access Control (RBAC)', level: 85, description: 'Permission-based security' },
            ]
        },
        regtech: {
            title: 'RegTech & Compliance',
            icon: Shield,
            color: 'red',
            skills: [
                { name: 'ZATCA (Saudi Arabia)', level: 90, description: 'Saudi electronic invoicing compliance' },
                { name: 'LHDN (Malaysia)', level: 85, description: 'Malaysian e-invoicing regulations' },
                { name: 'Government Compliance Systems', level: 88, description: 'Zero-trust security architectures' },
                { name: 'Tax Regulations Implementation', level: 85, description: 'Phase 2 compliance systems' },
            ]
        },
        devtools: {
            title: 'DevOps & Tools',
            icon: Cog,
            color: 'yellow',
            skills: [
                { name: 'Git/GitHub/GitLab (Basics)', level: 80, description: 'Version control and collaboration' },
                { name: 'Vercel', level: 85, description: 'Deployment platform' },
                { name: 'Bun.js', level: 70, description: 'JavaScript runtime' },
                { name: 'Postman', level: 88, description: 'API testing and documentation' },
            ]
        },
    };

    const categories = Object.keys(skillCategories) as CategoryId[];

    return (
        <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
            <RobotGuide
                character="gamma"
                message="Greetings! I'm GAMMA, the skills analyzer. I've compiled a comprehensive report of CHOZHARAJAN M's technical capabilities. From MERN stack expertise to RegTech compliance systems, these skills have been battle-tested in real enterprise projects!"
                isVisible={showGuide}
                onComplete={() => setShowGuide(false)}
                position="left"
            />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(168, 85, 247, 0.4)",
                                "0 0 40px rgba(168, 85, 247, 0.6)",
                                "0 0 20px rgba(168, 85, 247, 0.4)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        TECHNICAL EXPERTISE
                    </motion.h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Comprehensive overview of CHOZHARAJAN M's technical capabilities across MERN stack, Next.js, RegTech compliance, and enterprise systems.
                    </p>
                </motion.div>

                {/* Category Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => {
                        const { title, icon: Icon, color } = skillCategories[category];
                        const isActive = activeCategory === category;

                        return (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border ${isActive
                                    ? `bg-${color}-500/20 text-${color}-300 border-${color}-400 shadow-lg shadow-${color}-500/20`
                                    : 'bg-gray-800/50 text-gray-400 border-gray-600 hover:border-purple-400/50 hover:text-purple-300'
                                    }`}
                            >
                                <Icon className="w-6 h-6" />
                                <span>{title}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Skills Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {skillCategories[activeCategory].skills.map((skill: Skill, index: number) => {
                            const isHovered = hoveredSkill === skill.name;
                            const color = skillCategories[activeCategory].color;

                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isHovered
                                        ? `bg-${color}-500/10 border-${color}-400 shadow-lg shadow-${color}-500/20`
                                        : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                                        }`}
                                >
                                    {/* Skill header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${isHovered ? `text-${color}-300` : 'text-white'}`}>
                                                {skill.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{skill.description}</p>
                                        </div>
                                        <div className={`text-2xl font-bold ${isHovered ? `text-${color}-400` : 'text-gray-300'}`}>
                                            {skill.level}%
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="relative">
                                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                                className={`bg-gradient-to-r from-${color}-400 to-${color}-600 h-3 rounded-full relative overflow-hidden`}
                                            >
                                                {/* Animated shine effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                                />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Holographic effect */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent rounded-2xl"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Skill level indicator */}
                                    <div className="absolute top-4 right-4 flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: i < Math.floor(skill.level / 20) ? 1 : 0.3 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                                                className={`w-2 h-2 rounded-full ${i < Math.floor(skill.level / 20)
                                                    ? `bg-${color}-400`
                                                    : 'bg-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Stats Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: 'Technologies', value: '20+', icon: Code },
                        { label: 'Frameworks', value: '8+', icon: Zap },
                        { label: 'Databases', value: '2+', icon: Database },
                        { label: 'Specializations', value: '5+', icon: Shield },
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-600"
                            >
                                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                                <motion.div
                                    className="text-3xl font-bold text-white mb-2"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Next section hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center"
                >
                    <p className="text-purple-300">
                        <strong>System Status:</strong> Skills matrix analysis complete. Ready to showcase practical implementations...
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('projects')}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white"
                    >
                        VIEW PROJECTS
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;
