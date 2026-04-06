import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star and shooting star arrays
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
    }> = [];

    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
    }> = [];

    // Initialize stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        ctx.save();
        const twinkle = Math.sin(time * star.twinkleSpeed * 100) * 0.3 + 0.7;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = darkMode ? '#ffffff' : '#1e3a8a';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move stars slightly for parallax effect
        star.y += star.speed * 0.1;
        star.x += Math.sin(time * 0.1) * 0.1;

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
      });

      // Create new shooting stars occasionally
      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 12,
          angle: Math.random() * Math.PI * 0.3 + Math.PI * 0.15,
          opacity: 1,
          life: 1,
        });
      }

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        ctx.save();
        ctx.globalAlpha = star.opacity * star.life;
        ctx.strokeStyle = darkMode ? '#ffffff' : '#3b82f6';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        // Create gradient for shooting star trail
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, darkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(1, darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(59, 130, 246, 1)');
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();

        // Update shooting star position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life -= 0.008;

        // Remove dead shooting stars
        if (star.life <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]);

  const scrollToNext = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800' : 'bg-gradient-to-br from-accent-50 via-cream-50 to-accent-100'
    }`}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Orbs for Aesthetic Effect */}
      <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        darkMode ? 'bg-primary-600/30' : 'bg-accent-100/50'
      }`}></div>
      <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        darkMode ? 'bg-accent-800/30' : 'bg-cream-200/50'
      }`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        darkMode ? 'bg-primary-700/20' : 'bg-accent-200/40'
      }`} style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Name with Gradient Text */}
            <motion.h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 ${
                darkMode 
                  ? 'bg-gradient-to-r from-white via-cream-500 to-cream-600 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-accent-400 via-accent-300 to-cream-300 bg-clip-text text-transparent'
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Hi, I'm <span className={`${
                darkMode 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-700 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-cream-200 to-accent-200 bg-clip-text text-transparent'
              }`}>Atul Raj Gautam</span>
            </motion.h1>

            {/* Role with Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-6"
            >
              <div className={`backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl ${
                darkMode 
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white/40 border border-white/20'
              }`}>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
                  darkMode
                    ? 'bg-gradient-to-r from-primary-500 via-accent-700 to-primary-600 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-cream-200 via-accent-200 to-cream-300 bg-clip-text text-transparent'
                }`}>
                  AI/ML Engineer & Full-Stack Developer
                </h2>
                <p className={`text-lg ${darkMode ? 'text-cream-500' : 'text-accent-300'}`}>
                  Computer Science Engineering Student
                </p>
              </div>
            </motion.div>

            {/* Description with Glassmorphism */}
            <motion.div
              className={`backdrop-blur-xl rounded-2xl p-6 mb-10 shadow-2xl ${
                darkMode 
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white/40 border border-white/20'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <p className={`text-lg sm:text-xl leading-relaxed ${
                darkMode ? 'text-cream-500' : 'text-accent-300'
              }`}>
                Building intelligent systems with <span className={`font-semibold ${darkMode ? 'text-primary-500' : 'text-cream-200'}`}>ML & Gen AI</span>. 
                Specializing in <span className={`font-semibold ${darkMode ? 'text-primary-500' : 'text-cream-200'}`}>Python</span> & <span className={`font-semibold ${darkMode ? 'text-primary-500' : 'text-cream-200'}`}>React</span> to create impactful solutions.
              </p>
            </motion.div>

            {/* CTA Buttons with Enhanced Styling */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                  darkMode
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-accent-700 text-white shadow-primary-600/50 hover:shadow-2xl hover:shadow-primary-600/70'
                    : 'bg-gradient-to-r from-cream-200 to-accent-200 hover:from-accent-200 hover:to-cream-300 text-white shadow-cream-200/50 hover:shadow-2xl hover:shadow-cream-200/70'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Projects</span>
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur ${
                  darkMode ? 'bg-gradient-to-r from-primary-500 to-accent-700' : 'bg-gradient-to-r from-accent-100 to-cream-100'
                }`}></div>
              </motion.button>

              <motion.button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`backdrop-blur-xl px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  darkMode
                    ? 'bg-white/10 border-2 border-primary-600 text-white hover:bg-primary-600/20 hover:shadow-primary-600/30'
                    : 'bg-white/40 border-2 border-cream-200 text-accent-400 hover:bg-cream-200/20 hover:shadow-cream-200/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Tech Stack with Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 items-center"
            >
              {[
                { icon: '🐍', name: 'Python', color: darkMode ? 'from-yellow-400 to-yellow-600' : 'from-yellow-500 to-yellow-700' },
                { icon: '⚛️', name: 'React', color: darkMode ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700' },
                { icon: '🤖', name: 'AI/ML', color: darkMode ? 'from-primary-500 to-accent-700' : 'from-accent-700 to-primary-600' },
                { icon: '🟢', name: 'Node.js', color: darkMode ? 'from-green-400 to-green-600' : 'from-green-500 to-green-700' },
                { icon: '🗄️', name: 'Databases', color: darkMode ? 'from-primary-600 to-primary-500' : 'from-primary-700 to-accent-700' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`backdrop-blur-xl rounded-xl p-4 transition-all duration-300 shadow-lg hover:shadow-2xl group cursor-pointer ${
                    darkMode 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                      : 'bg-white/30 border border-white/20 hover:bg-white/50'
                  }`}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                  <p className={`text-xs font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>{tech.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className={`absolute inset-0 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-2xl animate-pulse ${
                darkMode ? 'bg-primary-600/50' : 'bg-cream-200/60'
              }`}></div>
              <div className={`relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 shadow-2xl ${
                darkMode ? 'border-primary-600 shadow-primary-600/50' : 'border-cream-200 shadow-cream-200/50'
              }`}>
                <img 
                  src="/profile.jpeg"
                  alt="Atul Raj Gautam"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Atul+Raj+Gautam&size=400&background=ff8c42&color=fff&bold=true';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator with Glow */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="relative group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`absolute inset-0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 ${
              darkMode ? 'bg-primary-600/50' : 'bg-cream-200/50'
            }`}></div>
            <ChevronDownIcon className={`relative h-8 w-8 transition-colors ${
              darkMode ? 'text-primary-500 group-hover:text-primary-400' : 'text-cream-200 group-hover:text-accent-200'
            }`} />
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
    </section>
  );
};

export default Hero;