import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
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
    <div className="min-h-screen bg-ink text-gray-200">
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
