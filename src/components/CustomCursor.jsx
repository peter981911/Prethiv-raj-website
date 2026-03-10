import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
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
                setIsHovering(true);
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
    }, []);

    // Framer motion variants for smooth spring physics
    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: 'transparent',
            border: '2px solid rgba(0, 240, 255, 0.5)',
            mixBlendMode: 'normal'
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: 'none',
            mixBlendMode: 'difference' // Inverts colors behind it for that premium look
        }
    };

    return (
        <>
            {/* The main outer ring that follows with physics */}
            <motion.div
                className="custom-cursor"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
            {/* The tiny exact dot */}
            <div
                className="cursor-dot"
                style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
            />
        </>
    );
};

export default CustomCursor;
