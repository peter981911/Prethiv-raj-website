import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Hero3D from './Hero3D';
import './Hero.css';

const Hero = () => {
    const cardRef = useRef(null);

    // Custom 3D Tilt effect logic for the centerpiece
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="hero-section container" id="home">
            <motion.div
                className="hero-content"
                initial="hidden"
                animate="visible"
                variants={titleVariants}
            >
                <motion.h2 className="hero-subtitle" variants={itemVariants}>
                    <span className="typing-cursor"></span>
                    System Online. User Identified.
                </motion.h2>
                <motion.h1 className="hero-title" variants={itemVariants}>
                    Engineering <br /> <span className="text-gradient focus-pulse">Secure</span> Systems.
                </motion.h1>
                <motion.p className="hero-desc" variants={itemVariants}>
                    I'm PRETHIV RAJ M V, a software developer interested in building scalable web applications, deploying them using modern cloud technologies, and understanding the security principles that keep systems reliable.
                </motion.p>
                <motion.div className="hero-actions" variants={itemVariants}>
                    <MagneticButton href="#projects" className="btn-primary">
                        Initialize Sequence
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </MagneticButton>
                    <MagneticButton href="#contact" className="btn-secondary">
                        Establish Link
                    </MagneticButton>
                </motion.div>
            </motion.div>

            <div className="hero-visual reveal-up" style={{ transitionDelay: '0.2s', position: 'relative' }}>
                <Hero3D />
                <div className="border-glow-wrap" ref={cardRef}>
                    <div className="hero-3d-card glass-panel tilt-card">
                        <div className="card-glare"></div>
                        <div className="tilt-card-content">
                            <div className="code-block">
                                <span className="code-comment">// Core capabilities module</span>
                                <span className="code-line"><span className="code-keyword">const</span> <span className="code-var">developer</span> = {'{'}</span>
                                <span className="code-line indent">role: <span className="code-string">"Software Developer"</span>,</span>
                                <span className="code-line indent">stack: [<span className="code-string">"React"</span>, <span className="code-string">"Node.js"</span>, <span className="code-string">"MongoDB"</span>],</span>
                                <span className="code-line indent">focus: <span className="code-string">"Secure Cloud Architectures"</span></span>
                                <span className="code-line">{'}'};</span>
                            </div>
                        </div>

                        {/* Decorative tech elements */}
                        <div className="tech-ring ring-1"></div>
                        <div className="tech-ring ring-2"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
