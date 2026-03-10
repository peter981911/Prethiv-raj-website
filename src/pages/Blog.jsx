import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import MagneticButton from '../components/MagneticButton';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
    useScrollReveal();
    const navigate = useNavigate();

    return (
        <motion.div
            className="blog-page section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="terminal-dots" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>

                    <h1 className="section-title" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        Transmission <br /> <span className="text-gradient focus-pulse">Pending...</span>
                    </h1>

                    <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', opacity: 0.8 }}>
                        The neural log is currently offline for maintenance and data synchronization.
                        New technical articles, security write-ups, and project deep-dives are being compiled.
                    </p>

                    <MagneticButton onClick={() => navigate('/')} className="btn-primary" style={{ margin: '0 auto' }}>
                        Return to Hub
                    </MagneticButton>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Blog;
