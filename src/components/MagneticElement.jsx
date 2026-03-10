import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticElement = ({ children, className, force = 0.3 }) => {
    const elementRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!elementRef.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = elementRef.current.getBoundingClientRect();

        // Calculate distance from center of element
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Attract logic (magnetic pull strength)
        setPosition({ x: x * force, y: y * force });
    };

    const handleMouseLeave = () => {
        // Snap back to center
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={elementRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`magnetic-wrap ${className || ''}`}
            style={{ display: 'inline-block', position: 'relative' }}
        >
            {children}
        </motion.div>
    );
};

export default MagneticElement;
