import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Palette, Cog, Zap, Shield, User } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface SkillsSectionProps {
    onNavigate: (section: string) => void;
}

type CategoryId = 'frontend' | 'backend' | 'devops' | 'tools' | 'regtech' | 'devtools' | 'languages' | 'exposure' | 'softskills';
type Skill = { name: string; level: number; description: string };
type SkillCategory = { title: string; icon: React.ComponentType<{ className?: string }>; color: string; skills: Skill[] };

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
            { name: 'Tailwind CSS', level: 90, description: 'Utility-first CSS framework' },
            { name: 'shadcn/ui', level: 85, description: 'UI component library' },
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
            { name: 'Bun.js', level: 70, description: 'JavaScript runtime and toolchain' },
            { name: 'RESTful APIs', level: 90, description: 'API design and implementation' },
            { name: 'GraphQL', level: 65, description: 'Query language for APIs' },
            { name: 'Microservices Architecture', level: 80, description: 'Decentralized system design' },
            { name: 'Server-Side Rendering (SSR)', level: 85, description: 'Rendering on the server' },
            { name: 'Redis', level: 70, description: 'In-memory data structure store' },
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
            { name: 'PostgreSQL', level: 80, description: 'Relational database management' },
            { name: 'Prisma', level: 85, description: 'Modern database toolkit' },
            { name: 'Mongoose', level: 88, description: 'ODM for MongoDB' },
            { name: 'Advanced Aggregation Pipelines', level: 85, description: 'Complex data processing' },
            { name: 'Database Indexing', level: 82, description: 'Performance optimization' },
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
            { name: 'Docker', level: 85, description: 'Containerization platform' },
            { name: 'AWS (EC2, S3, Lambda, RDS, IAM)', level: 75, description: 'Amazon Web Services suite' },
            { name: 'Vercel', level: 85, description: 'Deployment platform' },
            { name: 'Railway', level: 70, description: 'Platform for deploying apps' },
            { name: 'Git/GitHub/GitLab', level: 85, description: 'Version control and collaboration' },
            { name: 'CI/CD Pipelines', level: 75, description: 'Continuous integration/delivery' },
            { name: 'GitHub Actions', level: 70, description: 'Automated workflows' },
        ]
    },
    languages: {
        title: 'Programming Languages',
        icon: Code,
        color: 'indigo',
        skills: [
            { name: 'JavaScript', level: 95, description: 'Core language for web development' },
            { name: 'TypeScript', level: 90, description: 'Type-safe JavaScript superset' },
        ]
    },
    exposure: {
        title: 'AI & LLM Integration',
        icon: Zap,
        color: 'orange',
        skills: [
            { name: 'Vercel AI SDK', level: 85, description: 'AI SDK for building LLM applications' },
            { name: 'LLM Integration', level: 80, description: 'Integrating various large language models' },
            { name: 'Prompt Engineering', level: 75, description: 'Crafting effective prompts' },
            { name: 'Streaming APIs', level: 80, description: 'Real-time token streaming' },
        ]
    },
    softskills: {
        title: 'Soft Skills',
        icon: User,
        color: 'pink',
        skills: [
            { name: 'Rapid Learner', level: 95, description: 'Quickly adapt to new technologies and frameworks' },
            { name: 'Analytical Thinking', level: 92, description: 'Systematic problem-solving approach' },
            { name: 'Team Leadership', level: 88, description: 'Led engineering teams with agile methodologies' },
            { name: 'Production Deployments', level: 90, description: 'Zero-penalty deployment record' },
            { name: 'Agile/Scrum', level: 90, description: 'Sprint planning and iterative development' },
            { name: 'Cross-Team Collaboration', level: 87, description: 'Effective communication across departments' },
        ]
    },
};

const categories = Object.keys(skillCategories) as CategoryId[];

const getCategoryStyles = (category: CategoryId) => {
    switch (category) {
        case 'frontend':
            return {
                bgActive: 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/20',
                borderHover: 'hover:border-cyan-400/50 hover:text-cyan-300',
                bgCardActive: 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/20',
                textActive: 'text-cyan-300',
                textLevel: 'text-cyan-400',
                progressGradient: 'from-cyan-400 to-cyan-600',
                dotActive: 'bg-cyan-400',
                glowOverlay: 'via-cyan-500/5',
                glowBeam: 'via-cyan-400/20'
            };
        case 'backend':
            return {
                bgActive: 'bg-blue-500/20 text-blue-300 border-blue-400 shadow-lg shadow-blue-500/20',
                borderHover: 'hover:border-blue-400/50 hover:text-blue-300',
                bgCardActive: 'bg-blue-500/10 border-blue-400 shadow-lg shadow-blue-500/20',
                textActive: 'text-blue-300',
                textLevel: 'text-blue-400',
                progressGradient: 'from-blue-400 to-blue-600',
                dotActive: 'bg-blue-400',
                glowOverlay: 'via-blue-500/5',
                glowBeam: 'via-blue-400/20'
            };
        case 'devops':
            return {
                bgActive: 'bg-green-500/20 text-green-300 border-green-400 shadow-lg shadow-green-500/20',
                borderHover: 'hover:border-green-400/50 hover:text-green-300',
                bgCardActive: 'bg-green-500/10 border-green-400 shadow-lg shadow-green-500/20',
                textActive: 'text-green-300',
                textLevel: 'text-green-400',
                progressGradient: 'from-green-400 to-green-600',
                dotActive: 'bg-green-400',
                glowOverlay: 'via-green-500/5',
                glowBeam: 'via-green-400/20'
            };
        case 'tools':
            return {
                bgActive: 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-lg shadow-purple-500/20',
                borderHover: 'hover:border-purple-400/50 hover:text-purple-300',
                bgCardActive: 'bg-purple-500/10 border-purple-400 shadow-lg shadow-purple-500/20',
                textActive: 'text-purple-300',
                textLevel: 'text-purple-400',
                progressGradient: 'from-purple-400 to-purple-600',
                dotActive: 'bg-purple-400',
                glowOverlay: 'via-purple-500/5',
                glowBeam: 'via-purple-400/20'
            };
        case 'regtech':
            return {
                bgActive: 'bg-red-500/20 text-red-300 border-red-400 shadow-lg shadow-red-500/20',
                borderHover: 'hover:border-red-400/50 hover:text-red-300',
                bgCardActive: 'bg-red-500/10 border-red-400 shadow-lg shadow-red-500/20',
                textActive: 'text-red-300',
                textLevel: 'text-red-400',
                progressGradient: 'from-red-400 to-red-600',
                dotActive: 'bg-red-400',
                glowOverlay: 'via-red-500/5',
                glowBeam: 'via-red-400/20'
            };
        case 'devtools':
            return {
                bgActive: 'bg-yellow-500/20 text-yellow-300 border-yellow-400 shadow-lg shadow-yellow-500/20',
                borderHover: 'hover:border-yellow-400/50 hover:text-yellow-300',
                bgCardActive: 'bg-yellow-500/10 border-yellow-400 shadow-lg shadow-yellow-500/20',
                textActive: 'text-yellow-300',
                textLevel: 'text-yellow-400',
                progressGradient: 'from-yellow-400 to-yellow-600',
                dotActive: 'bg-yellow-400',
                glowOverlay: 'via-yellow-500/5',
                glowBeam: 'via-yellow-400/20'
            };
        case 'languages':
            return {
                bgActive: 'bg-indigo-500/20 text-indigo-300 border-indigo-400 shadow-lg shadow-indigo-500/20',
                borderHover: 'hover:border-indigo-400/50 hover:text-indigo-300',
                bgCardActive: 'bg-indigo-500/10 border-indigo-400 shadow-lg shadow-indigo-500/20',
                textActive: 'text-indigo-300',
                textLevel: 'text-indigo-400',
                progressGradient: 'from-indigo-400 to-indigo-600',
                dotActive: 'bg-indigo-400',
                glowOverlay: 'via-indigo-500/5',
                glowBeam: 'via-indigo-400/20'
            };
        case 'exposure':
            return {
                bgActive: 'bg-orange-500/20 text-orange-300 border-orange-400 shadow-lg shadow-orange-500/20',
                borderHover: 'hover:border-orange-400/50 hover:text-orange-300',
                bgCardActive: 'bg-orange-500/10 border-orange-400 shadow-lg shadow-orange-500/20',
                textActive: 'text-orange-300',
                textLevel: 'text-orange-400',
                progressGradient: 'from-orange-400 to-orange-600',
                dotActive: 'bg-orange-400',
                glowOverlay: 'via-orange-500/5',
                glowBeam: 'via-orange-400/20'
            };
        case 'softskills':
            return {
                bgActive: 'bg-pink-500/20 text-pink-300 border-pink-400 shadow-lg shadow-pink-500/20',
                borderHover: 'hover:border-pink-400/50 hover:text-pink-300',
                bgCardActive: 'bg-pink-500/10 border-pink-400 shadow-lg shadow-pink-500/20',
                textActive: 'text-pink-300',
                textLevel: 'text-pink-400',
                progressGradient: 'from-pink-400 to-pink-600',
                dotActive: 'bg-pink-400',
                glowOverlay: 'via-pink-500/5',
                glowBeam: 'via-pink-400/20'
            };
        default:
            return {
                bgActive: 'bg-gray-500/20 text-gray-300 border-gray-400 shadow-lg shadow-gray-500/20',
                borderHover: 'hover:border-gray-400/50 hover:text-gray-300',
                bgCardActive: 'bg-gray-500/10 border-gray-400 shadow-lg shadow-gray-500/20',
                textActive: 'text-gray-300',
                textLevel: 'text-gray-400',
                progressGradient: 'from-gray-400 to-gray-600',
                dotActive: 'bg-gray-400',
                glowOverlay: 'via-gray-500/5',
                glowBeam: 'via-gray-400/20'
            };
    }
};

const SkillsSection: React.FC<SkillsSectionProps> = React.memo(({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    const [activeCategory, setActiveCategory] = useState<CategoryId>('frontend');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <section className="min-h-screen flex items-center justify-center relative pt-24 pb-12 px-4 sm:px-6">
            <RobotGuide
                character="gamma"
                message="Greetings! I'm GAMMA, the skills analyzer. I've compiled a comprehensive report of CHOZHARAJAN M's technical capabilities. From full-stack development to RegTech compliance systems, these skills have been battle-tested in real enterprise projects!"
                isVisible={showGuide}
                onComplete={() => setShowGuide(false)}
                position="left"
            />

            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1
                        className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-glow-purple"
                    >
                        TECHNICAL EXPERTISE
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        Comprehensive overview of CHOZHARAJAN M's technical capabilities across full-stack development, compliance systems, and enterprise solutions.
                    </p>
                </motion.div>

                {/* Mobile scroll swipe indicator helper */}
                <div className="block md:hidden text-center text-xs text-cyan-400/90 font-medium mb-4 animate-pulse">
                    Swipe categories ↔
                </div>

                {/* Category Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible justify-start md:justify-center gap-3 mb-12 pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
                >
                    {categories.map((category) => {
                        const { title, icon: Icon } = skillCategories[category];
                        const isActive = activeCategory === category;
                        const styles = getCategoryStyles(category);

                        return (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center space-x-3 px-4 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 border flex-shrink-0 ${isActive
                                    ? styles.bgActive
                                    : `bg-gray-800/50 text-gray-400 border-gray-600 ${styles.borderHover}`
                                    }`}
                            >
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            const styles = getCategoryStyles(activeCategory);

                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isHovered
                                        ? styles.bgCardActive
                                        : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                                        }`}
                                >
                                    {/* Skill header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`text-xl font-bold mb-2 ${isHovered ? styles.textActive : 'text-white'}`}>
                                                {skill.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{skill.description}</p>
                                        </div>
                                        <div className={`text-2xl font-bold ${isHovered ? styles.textLevel : 'text-gray-300'}`}>
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
                                                className={`bg-gradient-to-r ${styles.progressGradient} h-3 rounded-full relative overflow-hidden`}
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
                                                className={`absolute inset-0 bg-gradient-to-r from-transparent ${styles.glowOverlay} to-transparent rounded-2xl`}
                                            >
                                                <motion.div
                                                    className={`absolute inset-0 bg-gradient-to-r from-transparent ${styles.glowBeam} to-transparent`}
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Skill level indicator */}
                                    <div className="absolute top-4 right-4 hidden sm:flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: i < Math.floor(skill.level / 20) ? 1 : 0.3 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                                                className={`w-2 h-2 rounded-full ${i < Math.floor(skill.level / 20)
                                                    ? styles.dotActive
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
                        { label: 'Technologies', value: '25+', icon: Code },
                        { label: 'Frameworks', value: '10+', icon: Zap },
                        { label: 'Databases', value: '3+', icon: Database },
                        { label: 'Specializations', value: '6+', icon: Shield },
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
});

export default SkillsSection;
