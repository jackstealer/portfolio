import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const socialLinks = [
  { name: 'GitHub', icon: '🐙', url: 'https://github.com/jackstealer' },
  { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/atul-raj-gautam-04b170238/' },
  { name: 'Twitter', icon: '🐦', url: 'https://x.com/jackstealer690' },
  { name: 'Email', icon: '📧', url: 'mailto:jackstealer690@gmail.com' },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800' : 'bg-gradient-to-br from-accent-50 via-cream-50 to-accent-100'
    } transition-colors duration-300`}>
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-600/20' : 'bg-accent-100/40'
        }`} />
        <div className={`absolute bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-500/20' : 'bg-cream-200/40'
        }`} />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            darkMode 
              ? 'bg-gradient-to-r from-white via-cream-500 to-cream-600 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-accent-400 via-accent-300 to-cream-300 bg-clip-text text-transparent'
          }`}>
            Get In <span className={darkMode ? 'bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-cream-200 to-accent-200 bg-clip-text text-transparent'}>Touch</span>
          </h2>
          <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${
            darkMode ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-gradient-to-r from-cream-200 to-accent-200'
          }`} />
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-cream-500' : 'text-primary-800'}`}>
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-xl ${
              darkMode 
                ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                : 'bg-white/40 backdrop-blur-xl border border-white/20'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-cream-500' : 'text-primary-800'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all ${
                    darkMode 
                      ? 'bg-white/5 border border-white/20 text-white placeholder-gray-400' 
                      : 'bg-white border border-primary-700/30 text-primary-800 placeholder-primary-700/50'
                  }`}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-cream-500' : 'text-primary-800'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all ${
                    darkMode 
                      ? 'bg-white/5 border border-white/20 text-white placeholder-gray-400' 
                      : 'bg-white border border-primary-700/30 text-primary-800 placeholder-primary-700/50'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-cream-500' : 'text-primary-800'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all ${
                    darkMode 
                      ? 'bg-white/5 border border-white/20 text-white placeholder-gray-400' 
                      : 'bg-white border border-primary-700/30 text-primary-800 placeholder-primary-700/50'
                  }`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-cream-500' : 'text-primary-800'
                }`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none ${
                    darkMode 
                      ? 'bg-white/5 border border-white/20 text-white placeholder-gray-400' 
                      : 'bg-white border border-primary-700/30 text-primary-800 placeholder-primary-700/50'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-primary-400 disabled:to-primary-500 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode 
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                  : 'text-gray-900'
              }`}>
                Let's Connect
              </h3>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-white/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gradient-to-br from-primary-600 to-primary-500' : 'bg-gradient-to-br from-accent-700 to-primary-600'
                  }`}>
                    <EnvelopeIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className={darkMode ? 'text-cream-500' : 'text-primary-800'}>jackstealer690@gmail.com</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-white/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gradient-to-br from-primary-500 to-primary-600' : 'bg-gradient-to-br from-primary-700 to-accent-700'
                  }`}>
                    <PhoneIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className={darkMode ? 'text-cream-500' : 'text-primary-800'}>+91 9258298892</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-white/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gradient-to-br from-primary-600 to-accent-700' : 'bg-gradient-to-br from-accent-700 to-primary-600'
                  }`}>
                    <MapPinIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className={darkMode ? 'text-cream-500' : 'text-primary-800'}>India</span>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-primary-800'
              }`}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      darkMode 
                        ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                        : 'bg-white/40 backdrop-blur-xl border border-white/20'
                    }`}
                  >
                    <span className="text-2xl">{link.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-primary-600/10 to-primary-500/10 border border-primary-600/20' 
                  : 'bg-gradient-to-br from-accent-700/10 to-primary-600/10 border border-accent-700/30'
              }`}
            >
              <h4 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-primary-800'
              }`}>
                Available for Work
              </h4>
              <p className={darkMode ? 'text-cream-500' : 'text-primary-700'}>
                I'm currently available for freelance projects and full-time opportunities. 
                Let's create something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;