import React from 'react';
import { motion } from 'framer-motion';

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skillCategories = [
    {
      title: "💻 Programming Languages",
      skills: [
        { name: "Python ⭐", icon: "🐍", color: "text-yellow-500" },
        { name: "C / C++", icon: "⚙️", color: "text-blue-600" },
        { name: "JavaScript (ES6+)", icon: "🟨", color: "text-yellow-400" },
        { name: "TypeScript", icon: "🔷", color: "text-blue-500" },
      ]
    },
    {
      title: "� Frontend Development",
      skills: [
        { name: "React.js", icon: "⚛️", color: "text-blue-500" },
        { name: "Next.js", icon: "▲", color: "text-gray-800 dark:text-white" },
        { name: "HTML5", icon: "🌐", color: "text-orange-500" },
        { name: "CSS3", icon: "🎯", color: "text-blue-400" },
        { name: "Tailwind CSS", icon: "🎨", color: "text-teal-500" },
      ]
    },
    {
      title: "⚙️ Backend Development",
      skills: [
        { name: "Node.js", icon: "�", color: "text-green-500" },
        { name: "Express.js", icon: "🚀", color: "text-gray-700 dark:text-gray-300" },
        { name: "REST API", icon: "🔗", color: "text-purple-500" },
        { name: "GraphQL (basic)", icon: "�", color: "text-pink-500" },
        { name: "Socket.io", icon: "⚡", color: "text-yellow-400" },
      ]
    },
    {
      title: "🧠 AI / Machine Learning",
      skills: [
        { name: "NumPy", icon: "�", color: "text-blue-600" },
        { name: "Pandas", icon: "�", color: "text-purple-600" },
        { name: "Matplotlib", icon: "📊", color: "text-orange-500" },
        { name: "Data Preprocessing", icon: "�", color: "text-green-500" },
        { name: "Supervised Learning", icon: "🤖", color: "text-blue-500" },
        { name: "Model Training", icon: "🎯", color: "text-red-500" },
      ]
    },
    {
      title: "🗄️ Databases",
      skills: [
        { name: "MongoDB", icon: "�", color: "text-green-600" },
        { name: "MySQL", icon: "�️", color: "text-orange-600" },
        { name: "PostgreSQL", icon: "�", color: "text-blue-700" },
        { name: "Firebase", icon: "🔥", color: "text-yellow-500" },
      ]
    },
    {
      title: "🛠️ Tools & Technologies",
      skills: [
        { name: "Git & GitHub", icon: "📝", color: "text-orange-500" },
        { name: "VS Code", icon: "💻", color: "text-blue-600" },
        { name: "Postman", icon: "📮", color: "text-orange-500" },
        { name: "Figma", icon: "🎨", color: "text-purple-500" },
      ]
    },
    {
      title: "📊 Core CS",
      skills: [
        { name: "DSA 🚀", icon: "🧩", color: "text-green-500" },
        { name: "Problem Solving", icon: "💡", color: "text-yellow-500" },
        { name: "OOP Concepts", icon: "🏗️", color: "text-blue-500" },
      ]
    },
    {
      title: "☁️ Cloud & DevOps",
      skills: [
        { name: "AWS (basic)", icon: "☁️", color: "text-orange-400" },
        { name: "Docker (basic)", icon: "🐳", color: "text-blue-500" },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800' : 'bg-gradient-to-br from-accent-50 via-cream-50 to-accent-100'
      } transition-colors duration-300`}
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 left-40 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-600/20' : 'bg-accent-700/15'
        }`}></div>
        <div className={`absolute bottom-40 right-40 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-primary-500/20' : 'bg-primary-600/15'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            darkMode ? 'bg-gradient-to-r from-white via-cream-500 to-cream-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 bg-clip-text text-transparent'
          }`}>
            My <span className={`${darkMode ? 'bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-accent-700 to-primary-600 bg-clip-text text-transparent'}`}>Skills</span>
          </h2>
          
          <div className={`w-24 h-1 mx-auto mb-8 rounded-full ${
            darkMode ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-gradient-to-r from-accent-700 to-primary-600'
          }`} />
          
          <p className={`text-lg max-w-3xl mx-auto ${
            darkMode ? 'text-cream-500' : 'text-primary-800'
          }`}>
            I work with a diverse set of technologies to build modern, scalable applications.
            Here are the tools and technologies I'm proficient in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`p-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                  : 'bg-white/40 border border-white/20 hover:bg-white/60'
              }`}
            >
              <motion.h3
                variants={itemVariants}
                className={`text-lg font-bold mb-6 text-center border-b pb-3 ${
                  darkMode ? 'text-white border-white/10' : 'text-primary-800 border-primary-700/20'
                }`}
              >
                {category.title}
              </motion.h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className={`flex items-center p-3 rounded-xl backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                      darkMode 
                        ? 'bg-white/5 hover:bg-white/10 border border-white/5' 
                        : 'bg-white/30 hover:bg-white/50 border border-white/10'
                    }`}
                  >
                    <span className="text-2xl mr-3 group-hover:scale-125 transition-transform duration-200">
                      {skill.icon}
                    </span>
                    <span className={`font-medium text-sm transition-colors duration-200 ${
                      darkMode ? 'text-cream-500 group-hover:text-white' : 'text-primary-800'
                    }`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className={`text-2xl font-semibold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-primary-800'
          }`}>
            Core Competencies
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { skill: "React", level: 80, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-500 to-blue-700" },
              { skill: "Python", level: 85, color: darkMode ? "from-yellow-400 to-yellow-600" : "from-yellow-500 to-yellow-700" },
              { skill: "DSA", level: 70, color: darkMode ? "from-primary-500 to-primary-600" : "from-accent-700 to-primary-600" },
              { skill: "ML", level: 65, color: darkMode ? "from-primary-600 to-accent-700" : "from-primary-700 to-accent-700" },
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/40 border border-white/20'
                }`}
              >
                <div className="flex justify-between mb-3">
                  <span className={`font-bold text-lg ${
                    darkMode ? 'text-white' : 'text-primary-800'
                  }`}>
                    {item.skill}
                  </span>
                  <span className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.level}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-3 overflow-hidden ${
                  darkMode ? 'bg-white/10' : 'bg-primary-700/20'
                }`}>
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className={`p-8 rounded-3xl backdrop-blur-xl shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-primary-600/10 to-primary-500/10 border border-primary-600/30' 
              : 'bg-gradient-to-br from-accent-700/10 to-primary-600/10 border border-accent-700/30'
          }`}>
            <h3 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${
              darkMode ? 'text-white' : 'text-primary-800'
            }`}>
              <span className="text-4xl animate-pulse">🔥</span>
              Current Focus
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: "🤖", 
                  title: "Machine Learning & Generative AI",
                  description: "Deepening expertise in ML algorithms and Gen AI applications",
                  color: darkMode ? "from-primary-500 to-primary-600" : "from-accent-700 to-primary-600"
                },
                { 
                  icon: "🏗️", 
                  title: "Building Real-World AI Projects",
                  description: "Creating practical AI solutions that solve actual problems",
                  color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-500 to-blue-700"
                },
                { 
                  icon: "💪", 
                  title: "Strengthening DSA for Interviews",
                  description: "Consistent practice and problem-solving on LeetCode",
                  color: darkMode ? "from-primary-600 to-accent-700" : "from-primary-700 to-accent-700"
                }
              ].map((focus, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/40 border border-white/20'
                  }`}
                >
                  <div className="text-5xl mb-4">{focus.icon}</div>
                  <h4 className={`text-lg font-bold mb-3 bg-gradient-to-r ${focus.color} bg-clip-text text-transparent`}>
                    {focus.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${
                    darkMode ? 'text-cream-500' : 'text-primary-700'
                  }`}>
                    {focus.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;