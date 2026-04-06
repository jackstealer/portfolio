import React from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const projects = [
    {
      title: "FinGuide - AI Personal Finance Advisor",
      description: "An AI-powered personal finance advisor that helps students and young professionals track expenses and get smart saving recommendations. Features advanced ML analysis using ensemble models with 85-90% accuracy.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop",
      tech: ["React", "Flask", "Python", "Machine Learning", "scikit-learn"],
      liveDemo: "https://github.com/jackstealer/finguide",
      github: "https://github.com/jackstealer/finguide",
      featured: true
    },
    {
      title: "Weather Forecasting ML",
      description: "ML-powered weather forecasting application with 97% accuracy using XGBoost. Features multiple ML models, interactive web UI with 3 modes, and multi-hour forecasting up to 7 days ahead.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop",
      tech: ["Python", "XGBoost", "Streamlit", "scikit-learn", "Plotly"],
      liveDemo: "https://github.com/jackstealer/weather-forecasting-ml",
      github: "https://github.com/jackstealer/weather-forecasting-ml",
      featured: true
    },
    {
      title: "AgriSmart - Smart Crop Intelligence System",
      description: "A full-stack agriculture platform connecting farmers and buyers with AI-powered crop management, live market prices, weather insights, disease detection, and smart order logistics.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
      tech: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
      liveDemo: "https://github.com/jackstealer/AgriSmart",
      github: "https://github.com/jackstealer/AgriSmart",
      featured: true
    },
    {
      title: "VisionCart - AI Voice E-commerce",
      description: "AI-powered voice e-commerce platform for visually impaired users. Features WCAG AAA accessibility, voice-first shopping, AI product descriptions, and conversational assistant.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
      tech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI"],
      liveDemo: "https://github.com/jackstealer/VisionCart",
      github: "https://github.com/jackstealer/VisionCart",
      featured: false
    },
    {
      title: "Google Trends Analyzer",
      description: "Professional Google Trends analysis tool with CLI and Streamlit web dashboard. Features comprehensive EDA, visualizations, forecasting, and data export capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "scikit-learn"],
      liveDemo: "https://github.com/jackstealer/google-trends-analyzer",
      github: "https://github.com/jackstealer/google-trends-analyzer",
      featured: false
    },
    {
      title: "Spice Symphony Restaurant",
      description: "Premium responsive restaurant website with dark + gold theme. Features interactive menu, gallery, testimonials, reservation form, and smooth animations.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
      tech: ["HTML5", "CSS3", "JavaScript", "AOS"],
      liveDemo: "https://github.com/jackstealer/spice-symphony-restaurant",
      github: "https://github.com/jackstealer/spice-symphony-restaurant",
      featured: false
    },
    {
      title: "HabitFlow - Daily Habit Tracker",
      description: "Full-stack habit tracking application with NestJS backend and Next.js frontend. Features streak tracking, analytics dashboard, and beautiful visualizations.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
      tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "TypeScript"],
      liveDemo: "https://github.com/jackstealer/habit-tracker",
      github: "https://github.com/jackstealer/habit-tracker",
      featured: false
    },
    {
      title: "Verbiage - Language Translation App",
      description: "Production-grade Android app for real-time language translation. Features voice & text translation, offline access, and Material Design 3 UI.",
      image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=800&h=500&fit=crop",
      tech: ["Kotlin", "Android", "Firebase", "Room", "MVVM"],
      liveDemo: "https://github.com/jackstealer/Verbiage",
      github: "https://github.com/jackstealer/Verbiage",
      featured: false
    }
  ];

  return (
    <section 
      id="projects" 
      className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800' : 'bg-gradient-to-br from-accent-50 via-cream-50 to-accent-100'
      } transition-colors duration-300`}
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-600/20' : 'bg-accent-100/40'
        }`} />
        <div className={`absolute bottom-40 -right-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-500/20' : 'bg-cream-200/40'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}>
            My <span className={darkMode ? 'bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent' : 'text-primary-500'}>Projects</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-8 rounded-full" />
          
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl mx-auto`}>
            Here are some of the projects I've worked on. Each project showcases different 
            aspects of my development skills and problem-solving abilities.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h3 className={`text-2xl font-semibold mb-8 ${
            darkMode 
              ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}>
            Featured Projects
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                    : 'bg-white/40 backdrop-blur-xl border border-white/20'
                }`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x500/1f2937/6366f1?text=' + encodeURIComponent(project.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-700 via-primary-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 backdrop-blur-sm text-primary-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        <span>View</span>
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-700/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        <span>Code</span>
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h4 className={`text-xl font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h4>
                  
                  <p className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } mb-4 leading-relaxed`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full ${
                          darkMode 
                            ? 'bg-primary-900/20 text-primary-400' 
                            : 'bg-primary-100 text-primary-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className={`text-2xl font-semibold mb-8 ${
            darkMode 
              ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
              : 'text-gray-900'
          }`}>
            Other Projects
          </h3>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.filter(project => !project.featured).map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className={`group p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
                    : 'bg-white/40 backdrop-blur-xl border border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-gradient-to-br from-primary-500/20 to-primary-600/10' : 'bg-gradient-to-br from-primary-100 to-primary-50'
                  }`}>
                    <span className="text-2xl">💻</span>
                  </div>
                  <div className="flex space-x-2">
                    <motion.a
                      href={project.github}
                      className={`p-2 rounded-lg ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      } transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <CodeBracketIcon className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={project.liveDemo}
                      className={`p-2 rounded-lg ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      } transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>

                <h4 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h4>
                
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } text-sm mb-4 leading-relaxed`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs rounded-full ${
                        darkMode 
                          ? 'bg-primary-900/20 text-primary-400' 
                          : 'bg-primary-100 text-primary-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/jackstealer"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl ${
              darkMode
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <CodeBracketIcon className="h-5 w-5" />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;