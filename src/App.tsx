import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Backdrop from './components/Backdrop';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Marquee from './components/Marquee';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // The navbar stays hidden until the hero's intro animation has played.
  const [introDone, setIntroDone] = useState(false);

  // Animations play for everyone, including visitors with reduced motion on (the owner's choice).
  return (
    // No background here: html/body paint the ink, so the Backdrop layer (z -10) can show above it.
    <div className="min-h-screen text-gray-200">
      <Backdrop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#0f1111', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
        }}
      />
      <Cursor />
      <Navbar visible={introDone} />
      <main>
        <Hero onIntroDone={() => setIntroDone(true)} />
        {/* Softens the edge where the solid-black hero meets the textured backdrop. */}
        <div aria-hidden className="pointer-events-none relative -mb-48 h-48 bg-gradient-to-b from-ink to-transparent" />
        <About />
        <Marquee />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
