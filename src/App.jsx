import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CursorSpotlight from './components/CursorSpotlight';
import Preloader from './components/Preloader';
import ParticleNetwork from './components/ParticleNetwork';
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Resume = lazy(() => import('./pages/Resume'));
const NotFound = lazy(() => import('./pages/NotFound'));
import InteractiveTerminal from './components/InteractiveTerminal';
import CyberGlitch from './components/CyberGlitch';
import AudioVisualizer from './components/AudioVisualizer';
import SensoryWarning from './components/SensoryWarning';
import { useKonamiCode } from './hooks/useKonamiCode';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(() => {
    return localStorage.getItem('sensoryWarningAccepted') === 'true';
  });
  const [isSystemCrashing, setIsSystemCrashing] = useState(false);
  const location = useLocation();

  const knownPaths = ['/', '/about', '/projects', '/blog', '/resume', '/terminal'];
  const is404 = !knownPaths.includes(location.pathname) && !location.pathname.startsWith('/blog/') && !location.pathname.startsWith('/project/');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const isKonamiTriggered = useKonamiCode();

  const handleWarningAccept = () => {
    localStorage.setItem('sensoryWarningAccepted', 'true');
    setHasAcceptedWarning(true);
  };

  useEffect(() => {
    const handleSystemCrash = () => {
      setIsSystemCrashing(true);
      // Recover after 3.5 seconds
      setTimeout(() => {
        setIsSystemCrashing(false);
        alert("SYSTEM RECOVERED. Just kidding. You don't have root access.");
      }, 3500);
    };

    window.addEventListener('systemDeleteMode', handleSystemCrash);
    return () => window.removeEventListener('systemDeleteMode', handleSystemCrash);
  }, []);

  return (
    <div className={`app-wrapper ${isKonamiTriggered ? 'konami-mode-active' : ''} ${isSystemCrashing ? 'system-crashing' : ''}`}>
      {!hasAcceptedWarning && <SensoryWarning onAccept={handleWarningAccept} />}

      <motion.div
        className="global-scroll-progress"
        style={{ scaleX }}
      />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <CursorSpotlight />
      <ParticleNetwork />
      <InteractiveTerminal />
      <AudioVisualizer />
      <CyberGlitch />

      {!is404 && <Navbar />}

      <AnimatePresence mode="wait">
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff', fontFamily: 'monospace', fontSize: '1.2rem', opacity: 0.5 }}>LOADING NEURAL CACHE...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!is404 && location.pathname !== '/terminal' && <Footer />}
    </div>
  );
}

export default App;
