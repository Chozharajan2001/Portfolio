import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Download, Linkedin, Github, Twitter } from 'lucide-react';
import RobotGuide from '../RobotGuide';

interface ContactSectionProps {
    onNavigate: (section: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
    const [showGuide, setShowGuide] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowGuide(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitSuccess(false), 5000);
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'chozharajan20112001@gmail.com',
            href: 'mailto:chozharajan20112001@gmail.com'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91-9361179493',
            href: 'tel:+919361179493'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Tamil Nadu, India',
            href: '#'
        }
    ];

    const socialLinks = [
        { icon: Github, label: 'GitHub', href: 'https://github.com/Chozharajan2001', color: 'gray' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/chozharajan-m-b23529245/', color: 'blue' },
        { icon: Twitter, label: 'Portfolio', href: 'https://portfolionew-git-main-chozhas-projects.vercel.app/', color: 'cyan' },
    ];

    return (
        <section className="min-h-screen relative pt-20 px-6 pb-12">
            <RobotGuide
                character="omega"
                message="Ready to connect! I'm OMEGA, your communications specialist. Feel free to reach out to CHOZHARAJAN M - Application Developer and Full Stack Engineer. I'm available for freelance work and full-time positions!"
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
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(251, 146, 60, 0.4)",
                                "0 0 40px rgba(251, 146, 60, 0.6)",
                                "0 0 20px rgba(251, 146, 60, 0.4)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        GET IN TOUCH
                    </motion.h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Have a project in mind or want to discuss opportunities? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-orange-500/30 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-orange-400 mb-6 flex items-center">
                                <Send className="w-8 h-8 mr-3" />
                                Send Message
                            </h3>

                            <AnimatePresence mode="wait">
                                {submitSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1 }}
                                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                        >
                                            <Send className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <h4 className="text-2xl font-bold text-green-400 mb-2">Message Transmitted!</h4>
                                        <p className="text-gray-300">Your message has been successfully sent. I'll respond within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: 1 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div
                                                whileFocus={{ scale: 1.02 }}
                                                className="relative"
                                            >
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                                                />
                                            </motion.div>

                                            <motion.div
                                                whileFocus={{ scale: 1.02 }}
                                                className="relative"
                                            >
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Your Email"
                                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Subject"
                                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                                            />
                                        </motion.div>

                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Your Message"
                                                rows={5}
                                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 resize-none"
                                            />
                                        </motion.div>

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-lg text-white flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    <span>Transmitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-6 h-6" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Contact Information */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-orange-500/30 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-orange-400 mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;

                                    return (
                                        <motion.a
                                            key={info.label}
                                            href={info.href}
                                            whileHover={{ scale: 1.02, x: 10 }}
                                            className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:border-orange-400/50 transition-all duration-300 group"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-400">{info.label}</div>
                                                <div className="text-white font-medium">{info.value}</div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-3xl border border-orange-500/30 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-orange-400 mb-6">Connect Online</h3>

                            <div className="grid grid-cols-1 gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;

                                    return (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-${social.color}-500/10 to-${social.color}-600/10 border border-${social.color}-500/30 rounded-xl hover:shadow-lg hover:shadow-${social.color}-500/20 transition-all duration-300`}
                                        >
                                            <Icon className={`w-8 h-8 text-${social.color}-400`} />
                                            <span className="text-white font-medium">{social.label}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Portfolio Link */}
                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.05 }}
                            className="block bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-3xl border border-purple-500/30 text-center cursor-pointer"
                        >
                            <Download className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <h4 className="text-xl font-bold text-purple-300 mb-2">View Portfolio</h4>
                            <p className="text-gray-400">Explore projects, skills, and case studies</p>
                        </motion.a>
                    </motion.div>
                </div>

                {/* Final Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-8 rounded-3xl border border-orange-500/20">
                        <h3 className="text-3xl font-bold text-orange-400 mb-4">Let's Discuss Your Project!</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            I'm currently available for freelance work and full-time positions.
                            Let's connect and discuss how I can contribute to your next project!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('home')}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-white"
                            >
                                Back to Home
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate('projects')}
                                className="px-8 py-3 border border-orange-400/50 rounded-xl font-semibold text-orange-300 hover:bg-orange-500/10"
                            >
                                View Projects
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* System Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <span className="text-green-300 text-sm font-medium">All systems operational - Ready for contact</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
