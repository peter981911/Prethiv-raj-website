import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import './GithubMatrix.css';

const GithubMatrix = ({ username = "peter981911" }) => {
    // We explicitly render nothing until mounted to avoid hydration mismatches if Next.js was used,
    // though here in Vite/React it just ensures clean mounting
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className="github-matrix-container glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="matrix-header">
                <span className="matrix-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </span>
                <h4>Neural Contribution Matrix</h4>
            </div>

            <div className="calendar-wrapper">
                <GitHubCalendar
                    username={username}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    hideTotalCount={false}
                    hideColorLegend={false}
                />
            </div>
            <div className="matrix-glow"></div>
        </motion.div>
    );
};

export default GithubMatrix;
