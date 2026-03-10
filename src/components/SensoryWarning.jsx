import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/audio';
import './SensoryWarning.css';

const SensoryWarning = ({ onAccept }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAccept = () => {
        playClickSound();
        setIsVisible(false);
        setTimeout(() => {
            onAccept();
        }, 500); // Wait for exit animation
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="sensory-warning-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="crts-overlay-warning"></div>
                    <div className="warning-content-box glass-panel">
                        <h2 className="warning-title">
                            <span className="warning-icon">⚠</span>
                            SYSTEM ADVISORY
                        </h2>

                        <div className="warning-body">
                            <p>
                                This digital environment contains high-fidelity interactive elements, including:
                            </p>
                            <ul>
                                <li>Dynamic sensory audio synthesis</li>
                                <li>Rapid visual sequences and strobe effects</li>
                                <li>Intense glitch animations</li>
                            </ul>
                            <p className="warning-highlight">
                                Viewer discretion is advised for individuals sensitive to flashing lights or immersive audio.
                            </p>
                        </div>

                        <button
                            className="warning-accept-btn"
                            onClick={handleAccept}
                            onMouseEnter={playHoverSound}
                        >
                            ACKNOWLEDGE & INITIALIZE
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SensoryWarning;
