import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate a loading process
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // trigger completion slightly after reaching 100
                    setTimeout(() => onComplete(), 500);
                    return 100;
                }
                // Random jumps for a more "loading data/fetching" tech feel
                return prev + Math.floor(Math.random() * 15) + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="preloader-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100vh", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="preloader-content">
                <motion.div
                    className="preloader-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-gradient">PRETHIV RAJ</span> M V
                </motion.div>

                <div className="loading-bar-container">
                    <motion.div
                        className="loading-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                <div className="terminal-load-text">
                    [SYSTEM_INIT] {progress}%
                </div>
            </div>

            {/* Background grid/overlay for tech feel */}
            <div className="preloader-bg-overlay"></div>
        </motion.div>
    );
};

export default Preloader;
