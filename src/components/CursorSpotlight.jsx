import React, { useEffect, useRef } from 'react';
import './CursorSpotlight.css';

/**
 * CursorSpotlight
 * Creates a hidden "X-Ray" layer on top of the entire page.
 * A radial gradient mask is pinned to the cursor, revealing the vibrant
 * neon circuitry beneath only within a spotlight radius.
 */
const CursorSpotlight = () => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        // Hide on touch devices since there is no cursor
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch || !overlay) return;

        const handleMouseMove = (e) => {
            // Update the mask position in real time
            overlay.style.setProperty('--x', `${e.clientX}px`);
            overlay.style.setProperty('--y', `${e.clientY}px`);
        };

        const handleMouseEnter = () => {
            overlay.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            overlay.style.opacity = '0';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <div className="cursor-spotlight" ref={overlayRef} />;
};

export default CursorSpotlight;
