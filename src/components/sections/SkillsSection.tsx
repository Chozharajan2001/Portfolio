import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Palette, Cog, Zap, Shield } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface SkillsSectionProps {
  onNavigate: (section: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onNavigate }) => {
  const [showGuide, setShowGuide] = useState(false);
  type CategoryId = 'frontend' | 'backend' | 'devops' | 'tools';
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
      title: 'Frontend Arsenal',
      icon: Palette,
      color: 'cyan',
      skills: [
        { name: 'React.js (Hooks, Context, Redux)', level: 90, description: 'Component architecture & state management' },
        { name: 'React Router', level: 88, description: 'SPA routing and nested layouts' },
        { name: 'Ant Design / Material UI', level: 85, description: 'UI libraries & design systems' },
        { name: 'Axios/Fetch & REST', level: 85, description: 'Data fetching patterns' },
        { name: 'Responsive Design & SCSS', level: 84, description: 'Mobile-first, modular styles' },
      ]
    },
    backend: {
      title: 'Backend Systems',
      icon: Database,
      color: 'blue',
      skills: [
        { name: 'Node.js & Express.js', level: 88, description: 'REST APIs, controllers, services' },
        { name: 'JWT Auth & Security', level: 85, description: 'Authentication, authorization, headers' },
        { name: 'Middleware (CORS, Helmet, Multer)', level: 84, description: 'Policy, security, uploads' },
        { name: 'Error Handling & Validation', level: 84, description: 'Centralized handlers, schemas' },
        { name: 'Bun.js (Runtime)', level: 70, description: 'Alternate runtime exploration' },
      ]
    },
    devops: {
      title: 'DevOps & Cloud',
      icon: Cog,
      color: 'green',
      skills: [
        { name: 'Git/GitHub/GitLab', level: 90, description: 'Branching, PRs, reviews' },
        { name: 'Vercel/Heroku', level: 85, description: 'CI/CD & deployments' },
        { name: 'Postman', level: 88, description: 'API testing & collections' },
        { name: 'npm/yarn', level: 86, description: 'Workflows & scripts' },
      ]
    },
    tools: {
      title: 'Languages & Extras',
      icon: Code,
      color: 'purple',
      skills: [
        { name: 'JavaScript (ES6+)', level: 90, description: 'Async/await, modules, patterns' },
        { name: 'MongoDB & Mongoose', level: 88, description: 'Schemas, aggregations, indexing' },
        { name: 'WebSockets (Socket.io)', level: 78, description: 'Realtime messaging' },
        { name: 'Performance (useMemo, React.memo)', level: 80, description: 'Rendering optimization' },
        { name: 'TypeScript & Tailwind (Learning)', level: 65, description: 'Actively adopting' },
      ]
    },
  };

  const categories = Object.keys(skillCategories) as CategoryId[];

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
      <RobotGuide
        character="gamma"
        message="Greetings! I'm GAMMA, the skills analyzer. I've compiled a comprehensive report of our developer's technical capabilities. These aren't just buzzwords - each skill has been battle-tested in real projects!"
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
            SKILLS MATRIX
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technical proficiency analysis complete. Displaying core competencies and expertise levels.
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
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
                  isActive
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
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isHovered
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
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(skill.level / 20) 
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
            { label: 'Languages', value: '2+', icon: Code },
            { label: 'Frameworks', value: '4+', icon: Zap },
            { label: 'Databases', value: '2+', icon: Database },
            { label: 'Tools', value: '10+', icon: Shield },
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