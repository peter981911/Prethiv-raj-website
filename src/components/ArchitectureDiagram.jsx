import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMonitor, FiShield, FiCpu, FiDatabase, FiCloud } from 'react-icons/fi';
import './ArchitectureDiagram.css';

const nodes = [
    { id: 'client', icon: <FiMonitor size={24} />, label: 'Client', desc: 'React SPA' },
    { id: 'waf', icon: <FiShield size={24} />, label: 'WAF', desc: 'Cloudflare' },
    { id: 'gateway', icon: <FiCloud size={24} />, label: 'API Gateway', desc: 'AWS API Gateway' },
    { id: 'compute', icon: <FiCpu size={24} />, label: 'Compute', desc: 'Serverless Functions' },
    { id: 'db', icon: <FiDatabase size={24} />, label: 'Database', desc: 'Managed NoSQL' },
];

const ArchitectureDiagram = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const nodeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.3,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2, ease: "linear", delay: 0.5 }
        }
    };

    const pulseVariants = {
        animate: {
            opacity: [0.2, 1, 0.2],
            boxShadow: [
                "0 0 10px rgba(0, 240, 255, 0)",
                "0 0 20px rgba(0, 240, 255, 0.8)",
                "0 0 10px rgba(0, 240, 255, 0)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="architecture-container glass-panel" ref={containerRef}>
            <div className="architecture-header">
                <h3>Standard Cloud Deployment Architecture</h3>
                <p>A visual representation of how I design secure, scalable cloud applications.</p>
            </div>

            <div className="architecture-flow">
                {/* SVG Connecting Lines - Desktop Only for simplicity */}
                <svg className="flow-lines" preserveAspectRatio="none">
                    <motion.path
                        d="M 10 50 L 90 50"
                        vectorEffect="non-scaling-stroke"
                        variants={pathVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    />
                </svg>

                <div className="nodes-wrapper">
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.id}
                            className="arch-node"
                            custom={i}
                            variants={nodeVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <motion.div
                                className="node-icon-wrapper"
                                variants={pulseVariants}
                                animate="animate"
                            >
                                {node.icon}
                            </motion.div>
                            <span className="node-label">{node.label}</span>
                            <span className="node-desc">{node.desc}</span>

                            {/* Animated data packet traveling between nodes */}
                            {i < nodes.length - 1 && (
                                <motion.div
                                    className="data-packet"
                                    initial={{ x: 0, opacity: 0 }}
                                    animate={{
                                        x: "calc(100% + 40px)",
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "linear"
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArchitectureDiagram;
