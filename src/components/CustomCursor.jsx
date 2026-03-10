import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    // 1. By extremely critical design, we do NOT use React state for X/Y coordinates!
    // React `useState` triggers component redraws. A mouse moves ~60 times a second.
    // That means React would continuously re-run 60+ times a second! Very bad for lag/stuttering!
    // Instead, Framer's useMotionValue injects values DIRECTLY to the DOM without React caring.
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Smooth the outer ring values using spring physics - matching exact previous variants
    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            // Update values bypassing React
            cursorX.set(e.clientX - 16); // 16px is half the 32px standard width
            cursorY.set(e.clientY - 16);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Check if hovering over clickable or interactive elements
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.project-card')
            ) {
                // We use state here because a hover is an infrequent interaction so redrawing is acceptable
                setIsHovering(true);
                // Also offset the ring differently during hover (+16 to scale - 32px to center of 50px)
                cursorX.set(e.clientX - 24);
                cursorY.set(e.clientY - 24);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    return (
        <>
            {/* The main outer ring that follows with physics */}
            <motion.div
                className="custom-cursor"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
                animate={isHovering ? {
                    scale: 1.5,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    border: 'none',
                    mixBlendMode: 'difference' // Inverts colors behind it for that premium look
                } : {
                    scale: 1,
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(0, 240, 255, 0.5)',
                    mixBlendMode: 'normal'
                }}
                transition={{ duration: 0.15 }}
            />
            {/* The tiny exact dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%", // Center exactly
                    translateY: "-50%"
                }}
            />
        </>
    );
};

export default CustomCursor;
