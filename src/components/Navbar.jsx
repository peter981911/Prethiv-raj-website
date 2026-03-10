import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import MagneticElement from './MagneticElement';
import { useTransitionContext } from '../utils/TransitionEngine';
import { playHoverSound, playClickSound } from '../utils/audio';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { triggerTransition } = useTransitionContext();

    // Easter Egg State
    const [tapCount, setTapCount] = useState(0);
    const [lastTapTime, setLastTapTime] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        playClickSound();
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Prevent background scrolling when menu is open
        document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
    };

    const handleNavClick = (path) => {
        playClickSound();

        // --- Easter Egg Logic for Logo Clicks ---
        if (path === '/') {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastTapTime;

            if (timeDiff < 500) {
                // Tapped fast enough
                const newCount = tapCount + 1;
                setTapCount(newCount);
                if (newCount === 7) {
                    // Trigger the event
                    const event = new Event('konamiDesecret');
                    window.dispatchEvent(event);
                    setTapCount(0); // Reset
                }
            } else {
                // Too slow, reset count
                setTapCount(1);
            }
            setLastTapTime(currentTime);
        }
        // ----------------------------------------

        if (location.pathname === path && path !== '/') return;

        if (path.startsWith('#') && location.pathname !== '/') {
            triggerTransition('/');
            setTimeout(() => {
                document.querySelector(path)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 800); // Wait for transition wipe
        } else if (path.startsWith('#')) {
            document.querySelector(path)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            triggerTransition(path);
        }
        if (isMobileMenuOpen) closeMenu();
    };

    const menuVariants = {
        closed: {
            clipPath: "circle(30px at calc(100% - 40px) 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            clipPath: `circle(2000px at calc(100% - 40px) 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }
    };

    const linkContainerVariants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const linkItemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <MagneticElement force={0.15}>
                        <span className="nav-logo" onClick={() => handleNavClick('/')} onMouseEnter={playHoverSound} style={{ cursor: 'pointer' }}>
                            <span className="text-gradient">PRETHIV RAJ</span> M V
                        </span>
                    </MagneticElement>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {location.pathname !== '/' && <MagneticButton onClick={() => handleNavClick('/')} className="nav-link">Home</MagneticButton>}
                        <MagneticButton onClick={() => handleNavClick('#about')} className="nav-link">About</MagneticButton>
                        <MagneticButton onClick={() => handleNavClick('#projects')} className="nav-link">Projects</MagneticButton>
                        <MagneticButton onClick={() => handleNavClick('/blog')} className="nav-link">Blog</MagneticButton>
                        <MagneticButton onClick={() => handleNavClick('/resume')} className="nav-btn">Resume</MagneticButton>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <MagneticElement force={0.25} className="mobile-hamburger-wrapper">
                        <button className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" onMouseEnter={playHoverSound}>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </MagneticElement>
                </div>
            </nav>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay glass-panel"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.div className="mobile-nav-links" variants={linkContainerVariants}>
                            <motion.span onClick={() => handleNavClick('/')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Home</motion.span>
                            <motion.span onClick={() => handleNavClick('/blog')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Blog</motion.span>
                            <motion.span onClick={() => handleNavClick('#about')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-link" style={{ cursor: 'pointer' }}>About</motion.span>
                            <motion.span onClick={() => handleNavClick('#projects')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Projects</motion.span>
                            <motion.span onClick={() => handleNavClick('#contact')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-link" style={{ cursor: 'pointer' }}>Contact</motion.span>
                            <motion.span onClick={() => handleNavClick('/resume')} onMouseEnter={playHoverSound} variants={linkItemVariants} className="mobile-nav-btn" style={{ cursor: 'pointer' }}>Resume</motion.span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
