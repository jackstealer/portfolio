import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // The navbar stays hidden until the hero's intro animation has played.
  const [introDone, setIntroDone] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink text-gray-200">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#0f1111', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
          }}
        />
        <Navbar visible={introDone} />
        <main>
          <Hero onIntroDone={() => setIntroDone(true)} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
