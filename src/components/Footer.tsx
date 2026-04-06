import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${
      darkMode ? 'bg-gradient-to-b from-primary-800 to-primary-900' : 'bg-gradient-to-b from-accent-100 to-accent-400'
    } transition-colors duration-300`}>
      {/* Background Gradient Orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-600/10' : 'bg-cream-200/30'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              JACKSTEALER
            </h3>
            <p className="text-gray-400 text-sm">
              Building the future, one line of code at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`transition-colors duration-200 text-sm ${
                    darkMode ? 'text-gray-400 hover:text-primary-500' : 'text-cream-500 hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Atul Raj Gautam. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Made with ❤️ using React & Tailwind CSS
            </p>
          </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 pt-8 border-t border-white/10"
        >
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center mb-2 hover:border-primary-500 hover:bg-white/5 transition-all duration-200">
                <span className="text-lg">↑</span>
              </div>
              <span className="text-xs">Back to Top</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;