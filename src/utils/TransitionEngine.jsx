import React, { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext();

export const useTransitionContext = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionColor, setTransitionColor] = useState('#00f0ff');
    const navigate = useNavigate();

    const triggerTransition = (toRoute, color = 'var(--accent-cyan)') => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setTransitionColor(color);

        // Wait for the wipe to cover the screen
        setTimeout(() => {
            navigate(toRoute);
            // Wait before lifting the wipe
            setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
        }, 800);
    };

    return (
        <TransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
            {children}

            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        className="webgl-liquid-wipe"
                        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
                        exit={{ clipPath: 'circle(0% at 50% 50%)' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1] // Custom snappy easing
                        }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: transitionColor,
                            zIndex: 9999, // Absolute highest layer
                            pointerEvents: 'none',
                            mixBlendMode: 'exclusion' // Cool webgl-like post-processing feel
                        }}
                    >
                        {/* We use CSS mix-blend-mode exclusion and massive scale to simulate a pixel/liquid shader wipe */}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: 'radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent)',
                                backgroundSize: '10px 10px',
                                opacity: 0.2
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
};
