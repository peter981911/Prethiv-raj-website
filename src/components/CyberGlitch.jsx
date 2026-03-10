import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CyberGlitch.css';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const CyberGlitch = () => {
    const [isActive, setIsActive] = useState(false);
    const [inputList, setInputList] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isActive) return;

            setInputList((prev) => {
                const newList = [...prev, e.key];
                const maxLength = KONAMI_CODE.length;
                if (newList.length > maxLength) {
                    newList.shift();
                }
                return newList;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive]);

    useEffect(() => {
        if (inputList.length === 0) return;

        const checkMatch = (codeArr) => {
            if (inputList.length < codeArr.length) return false;
            const slice = inputList.slice(-codeArr.length);
            return slice.every((key, i) => key.toLowerCase() === codeArr[i].toLowerCase());
        };

        // Note: For Konami, we don't use toLowerCase on 'ArrowUp' etc, so let's separate logic
        const konamiMatch = inputList.length >= KONAMI_CODE.length &&
            KONAMI_CODE.every((key, i) => key === inputList[inputList.length - KONAMI_CODE.length + i]);

        if (konamiMatch) {
            triggerGlitch();
        }
    }, [inputList]);

    const triggerGlitch = () => {
        setIsActive(true);
        setInputList([]);
        document.body.classList.add('global-glitch-active');

        // Add extreme glitch duration
        setTimeout(() => {
            setIsActive(false);
            document.body.classList.remove('global-glitch-active');
        }, 12000); // 12 seconds of chaos
    };

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="cyber-glitch-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 2 } }} // Fade back to reality slowly
                >
                    <div className="crts-overlay"></div>
                    <div className="glitch-noise"></div>
                    <div className="glitch-text-wrapper">
                        <h1 className="glitch-giant-text" data-text="OVERRIDE">OVERRIDE</h1>
                        <p className="glitch-sub-text">ROOT ACCESS GRANTED // MATRIX PROTOCOL ENGAGED</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CyberGlitch;
