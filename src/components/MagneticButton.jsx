import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/audio';

const MagneticButton = ({ children, className, href, onClick }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = buttonRef.current.getBoundingClientRect();

        // Calculate distance from center of button
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Attract logic (magnetic pull strength)
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        // Snap back to center
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
        playHoverSound();
    };

    const handleClick = (e) => {
        playClickSound();
        if (onClick) onClick(e);
    };

    const Comp = href ? 'a' : 'button';

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block' }}
        >
            <Comp
                href={href}
                onClick={handleClick}
                className={className}
            >
                {children}
            </Comp>
        </motion.div>
    );
};

export default MagneticButton;
