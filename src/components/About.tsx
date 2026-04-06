import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, CodeBracketIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const features = [
    {
      icon: CodeBracketIcon,
      title: "AI/ML Engineering",
      description: "Building intelligent systems with Machine Learning, Generative AI, Computer Vision, and NLP to create impactful solutions."
    },
    {
      icon: RocketLaunchIcon,
      title: "Full-Stack Development",
      description: "Proficient in Python, React, Node.js, and modern frameworks to build scalable, user-centric applications."
    },
    {
      icon: AcademicCapIcon,
      title: "Continuous Learning",
      description: "Mastering DSA fundamentals while actively building real-world projects and exploring emerging tech trends."
    }
  ];

  return (
    <section 
      id="about" 
      className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800' : 'bg-gradient-to-br from-accent-50 via-cream-50 to-accent-100'
      } transition-colors duration-300`}
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-600/20' : 'bg-accent-100/40'
        }`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-accent-800/20' : 'bg-cream-200/40'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
              darkMode ? 'bg-gradient-to-r from-white via-cream-500 to-cream-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-accent-400 via-accent-300 to-cream-300 bg-clip-text text-transparent'
            }`}
          >
            About <span className={`${darkMode ? 'bg-gradient-to-r from-primary-500 to-accent-700 bg-clip-text text-transparent' : 'bg-gradient-to-r from-cream-200 to-accent-200 bg-clip-text text-transparent'}`}>Me</span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 mx-auto mb-8 rounded-full ${
              darkMode ? 'bg-gradient-to-r from-primary-500 to-accent-700' : 'bg-gradient-to-r from-cream-200 to-accent-200'
            }`}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className={`backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/40 border border-white/20'
              }`}
            >
              <div className={`text-lg leading-relaxed space-y-4 ${
                darkMode ? 'text-cream-500' : 'text-accent-300'
              }`}>
                <p>
                  Hello! I'm <strong className={darkMode ? 'text-primary-500' : 'text-cream-200'}>Atul Raj Gautam</strong>, 
                  a Computer Science Engineering student and an aspiring AI/ML engineer with a strong foundation 
                  in full-stack development and problem-solving.
                </p>
                
                <p>
                  I specialize in building scalable and user-centric applications using modern technologies like 
                  Python, React, Node.js, and data-driven frameworks. With hands-on experience in machine learning, 
                  data analysis, and backend systems, I focus on creating solutions that are not just functional, 
                  but intelligent and impactful.
                </p>
                
                <p>
                  Currently, I'm deeply focused on mastering Machine Learning and Generative AI, combining strong 
                  fundamentals in Data Structures & Algorithms with real-world project building. I actively work 
                  on projects involving AI agents, computer vision, and NLP, aiming to bridge the gap between 
                  theoretical knowledge and practical implementation.
                </p>

                <p>
                  I believe in continuous learning and iteration, which is reflected in my consistent problem-solving 
                  practice and project development. Whether it's building AI-powered applications, exploring new 
                  frameworks, or contributing to innovative ideas, I'm always driven by curiosity and the desire to 
                  create meaningful technology.
                </p>

                <p>
                  Beyond coding, I enjoy exploring emerging tech trends, participating in hackathons, and turning 
                  ideas into real-world products that solve actual problems.
                </p>

                <p className={`italic font-medium text-center mt-6 p-4 rounded-xl ${
                  darkMode ? 'text-primary-500 bg-primary-600/10' : 'text-accent-700 bg-accent-700/10'
                }`}>
                  💡 "Building intelligent systems with AI & full-stack development — turning ideas into impactful products."
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: '🤖', label: 'AI/ML Engineer' },
                { icon: '💻', label: 'Full-Stack Developer' },
                { icon: '🎯', label: 'Problem Solver' }
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-300 ${
                    darkMode ? 'bg-primary-600/10 border border-primary-600/30' : 'bg-white/40 border border-accent-700/30'
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className={`font-semibold ${darkMode ? 'text-primary-500' : 'text-accent-700'}`}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`flex items-start space-x-4 p-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                    : 'bg-white/40 hover:bg-white/60 border border-white/20'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-primary-600/20' : 'bg-accent-700/20'
                  }`}>
                    <feature.icon className={`h-8 w-8 ${darkMode ? 'text-primary-500' : 'text-accent-700'}`} />
                  </div>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-primary-800'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    darkMode ? 'text-cream-500' : 'text-primary-700'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "8+", label: "ML Projects" },
            { number: "30+", label: "GitHub Repos" },
            { number: "15+", label: "Technologies" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center p-8 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/40 border border-white/20'
              }`}
            >
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                darkMode ? 'bg-gradient-to-r from-primary-500 to-accent-700 bg-clip-text text-transparent' : 'bg-gradient-to-r from-accent-700 to-primary-600 bg-clip-text text-transparent'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm md:text-base font-medium ${
                darkMode ? 'text-cream-500' : 'text-primary-700'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;