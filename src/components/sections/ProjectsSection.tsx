import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, Star, Eye, GitBranch } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface ProjectsSectionProps {
    onNavigate: (section: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const projects = [
        {
            id: 'zatca-compliance',
            title: 'ZATCA Compliance Integration (Live in Production)',
            category: 'enterprise',
            description: 'Spearheaded the development of a Phase-2 compliant e-invoicing ecosystem for Saudi Arabia (ZATCA). Currently used by live clients with 100% clearance rate for client submissions on first attempt.',
            image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['Node.js', 'Express', 'MongoDB', 'OpenSSL', 'XML Parsers', 'React'],
            stats: { stars: 100, views: 10000, commits: 120 },
            status: 'production',
            year: '2024'
        },
        {
            id: 'pos-framework',
            title: 'Multi-Store POS Framework',
            category: 'enterprise',
            description: 'Architected a scalable core POS engine designed for rapid client onboarding. Includes standard retail logic, but is architected to handle legacy data migration and custom client requirements.',
            image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['React', 'Zustand', 'Node.js', 'Express.js', 'Socket.io', 'MongoDB'],
            stats: { stars: 95, views: 8000, commits: 95 },
            status: 'production',
            year: '2024'
        },
        {
            id: 'lhdn-compliance',
            title: 'LHDN Compliance Integration',
            category: 'enterprise',
            description: 'Developed the compliance integration package for Malaysia\'s e-invoicing regulations. Ready for client implementation with adapted XML generation and encryption workflows.',
            image: 'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['Node.js', 'Express', 'OpenSSL', 'Crypto-js'],
            stats: { stars: 90, views: 5000, commits: 65 },
            status: 'ready',
            year: '2024'
        },
        {
            id: 'low-code-engine',
            title: 'Dynamic Enterprise Business System',
            category: 'enterprise',
            description: 'Designed a dynamic Low-code Engine to automate business workflows. Implemented database optimization resulting in 40% reduction in query latency and built a template engine for custom forms.',
            image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['React.js', 'Express.js', 'MongoDB', 'Advanced Aggregations'],
            stats: { stars: 88, views: 7000, commits: 80 },
            status: 'ongoing',
            year: '2024'
        },
        {
            id: 'personal-portfolio',
            title: 'Professional Portfolio',
            category: 'web',
            description: 'A high-performance personal brand website with optimized Core Web Vitals, lazy loading, dynamic routing, and SEO meta-tags.',
            image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['Next.js', 'Framer Motion', 'SCSS'],
            stats: { stars: 85, views: 3000, commits: 40 },
            status: 'production',
            year: '2024'
        },
        {
            id: 'markdown-editor',
            title: 'Markdown Editor & PDF Converter',
            category: 'web',
            description: 'A high-performance text editor for developers with PDF/Word/html export capabilities, completely client side and local storage.',
            image: 'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['NEXT js', 'Markdown-IT', 'dexie js', 'Zustand', 'React-PDF'],
            stats: { stars: 80, views: 2500, commits: 50 },
            status: 'ongoing',
            year: '2024'
        },
        {
            id: 'ai-chat-interface',
            title: 'AI Chat Interface (Next.js)',
            category: 'ai',
            description: 'A multi-model chat application allowing users to switch between different LLMs dynamically with streaming APIs for real-time token generation and prompt engineering templates.',
            image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
            tech: ['Next.js', 'Tailwind CSS', 'Mastra ai Framework'],
            stats: { stars: 92, views: 4000, commits: 70 },
            status: 'ongoing',
            year: '2024'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'enterprise', label: 'Enterprise Solutions' },
        { id: 'web', label: 'Web Apps' },
        { id: 'ai', label: 'AI/ML Projects' }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'production': return 'green';
            case 'beta': return 'orange';
            case 'development': return 'blue';
            default: return 'gray';
        }
    };

    return (
        <section className="min-h-screen relative pt-20 px-6 pb-12">
            <RobotGuide
                character="delta"
                message="Excellent! I'm DELTA, your project showcase coordinator. I've curated the most impressive implementations from CHOZHARAJAN M's portfolio. From ZATCA compliance systems to enterprise business solutions, each project demonstrates real-world problem-solving with cutting-edge technology!"
                isVisible={showGuide}
                onComplete={() => setShowGuide(false)}
                position="right"
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
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-600 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0%', '100%', '0%']
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        PROJECT SHOWCASE
                    </motion.h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Professional implementations showcasing expertise in MERN stack, Next.js, RegTech compliance, and enterprise solutions.
                    </p>
                </motion.div>

                {/* Filter Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filters.map((filterOption) => {
                        const isActive = filter === filterOption.id;

                        return (
                            <motion.button
                                key={filterOption.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(filterOption.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg shadow-green-500/20'
                                    : 'bg-gray-800/50 text-gray-400 border border-gray-600 hover:border-green-400/50 hover:text-green-300'
                                    }`}
                            >
                                {filterOption.label}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, index) => {
                            const statusColor = getStatusColor(project.status);

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-600 overflow-hidden hover:border-green-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
                                        {/* Project Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <motion.img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                            {/* Status Badge */}
                                            <motion.div
                                                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-${statusColor}-500/20 text-${statusColor}-300 border border-${statusColor}-500/40`}
                                                animate={{
                                                    boxShadow: [
                                                        `0 0 10px rgb(34 197 94 / 0.3)`,
                                                        `0 0 20px rgb(34 197 94 / 0.5)`,
                                                        `0 0 10px rgb(34 197 94 / 0.3)`
                                                    ]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {project.status.toUpperCase()}
                                            </motion.div>

                                            {/* Project Stats */}
                                            <div className="absolute bottom-4 left-4 flex space-x-4 text-white/80">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4" />
                                                    <span className="text-sm">{project.stats.stars}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">{(project.stats.views / 1000).toFixed(1)}k</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <GitBranch className="w-4 h-4" />
                                                    <span className="text-sm">{project.stats.commits}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                                                    {project.year}
                                                </span>
                                            </div>

                                            <p className="text-gray-400 mb-4 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 bg-gray-700/50 text-cyan-300 rounded text-xs font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                                                        +{project.tech.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-green-500/20"
                                                >
                                                    <Play className="w-4 h-4" />
                                                    <span>Demo</span>
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center justify-center p-2 border border-gray-600 rounded-lg hover:border-green-400/50 hover:text-green-300 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center justify-center p-2 border border-gray-600 rounded-lg hover:border-green-400/50 hover:text-green-300 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        <AnimatePresence>
                                            {selectedProject === project.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="border-t border-gray-700 bg-gray-800/50 p-6"
                                                >
                                                    <h4 className="text-green-400 font-semibold mb-3">Full Tech Stack:</h4>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.tech.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 rounded-lg text-sm font-medium border border-green-500/30"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="text-gray-400 text-sm">
                                                        <p><strong>Development Time:</strong> 3-6 months</p>
                                                        <p><strong>Team Size:</strong> 2-4 developers</p>
                                                        <p><strong>Role:</strong> Lead Developer & Architect</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Portfolio Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: 'Projects Delivered', value: '4+', color: 'green' },
                        { label: 'Years Experience', value: '2+', color: 'yellow' },

                        { label: 'RegTech Systems', value: '2+', color: 'purple' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-600"
                        >
                            <motion.div
                                className={`text-3xl font-bold text-${stat.color}-400 mb-2`}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Next Section Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="mt-12 p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-xl border border-green-500/20 text-center"
                >
                    <p className="text-green-300 mb-4">
                        <strong>Project Showcase Complete:</strong> Ready to discuss your next project?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('contact')}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg font-semibold text-white"
                    >
                        GET IN TOUCH
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
