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
      id: 'md-viewer-pdf',
      title: 'Markdown Viewer & PDF Converter',
      category: 'web',
      description: 'Render GitHub-flavored Markdown with live preview, theme switching, and one-click PDF export preserving styles and TOC.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'MUI/AntD', 'SCSS', 'Node', 'Express', 'PDF'],
      stats: { stars: 12, views: 800, commits: 45 },
      status: 'production',
      year: '2024'
    },
    {
      id: 'portfolio-modern',
      title: 'Attractive Portfolio',
      category: 'web',
      description: 'Responsive portfolio with project gallery, filters, animations, SEO and analytics, plus contact form integration.',
      image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Framer Motion', 'SCSS', 'SEO', 'Vercel'],
      stats: { stars: 9, views: 1200, commits: 30 },
      status: 'production',
      year: '2024'
    },
    {
      id: 'ai-chat-interface',
      title: 'AI Chat Interface',
      category: 'web',
      description: 'Customizable multi-model chat UI with model selection, system prompts, streaming, and exportable chat logs.',
      image: 'https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node', 'Express', 'WebSockets', 'APIs'],
      stats: { stars: 15, views: 1500, commits: 52 },
      status: 'beta',
      year: '2025'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'iot', label: 'IoT' },
    { id: 'ar', label: 'AR/VR' }
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
        message="Excellent! I'm DELTA, your project showcase coordinator. I've curated the most impressive implementations from our developer's portfolio. Each project demonstrates real-world problem-solving with cutting-edge technology!"
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
            PROJECT ARCHIVE
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world implementations showcasing technical expertise and creative problem-solving.
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
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
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
            { label: 'Projects Delivered', value: '50+', color: 'green' },
            { label: 'GitHub Stars', value: '2.1k+', color: 'yellow' },
            { label: 'Code Commits', value: '5.8k+', color: 'blue' },
            { label: 'Happy Clients', value: '25+', color: 'purple' },
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
            <strong>Archive Complete:</strong> Ready to establish communication protocols?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg font-semibold text-white"
          >
            INITIATE CONTACT
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;