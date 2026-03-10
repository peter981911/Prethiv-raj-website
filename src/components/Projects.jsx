import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import LiquidImage from './LiquidImage';
import { projectsData } from '../data/projectsData';
import { useTransitionContext } from '../utils/TransitionEngine';
import { playHoverSound, playClickSound } from '../utils/audio';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const glareRef = useRef(null);
    const { triggerTransition } = useTransitionContext();

    useEffect(() => {
        const card = cardRef.current;
        const glare = glareRef.current;
        if (!card || !glare) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Glare effect logic
            glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            glare.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            glare.style.opacity = '0';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div
            className="project-card has-image"
            ref={cardRef}
            variants={cardVariants}
            custom={index}
            onClick={() => {
                playClickSound();
                triggerTransition(`/project/${project.id}`);
            }}
            onMouseEnter={playHoverSound}
            style={{ cursor: 'pointer' }}
        >
            <div className="project-glare" ref={glareRef}></div>

            {project.image && (
                <div className="project-image-container">
                    <LiquidImage src={project.image} alt={project.title} />
                </div>
            )}

            <div className="project-content tilt-card-content">
                <div className="project-top">
                    <div className="project-links">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="icon-link">
                                <FiGithub size={20} />
                            </a>
                        )}
                        {project.external && (
                            <a href={project.external} target="_blank" rel="noreferrer" className="icon-link">
                                <FiExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <ul className="project-tech-list">
                    {project.tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <section className="section container" id="projects">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title"><span className="text-gradient">Featured</span> Nodes</h2>
                <div className="section-line"></div>
            </motion.div>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {projectsData.map((project, index) => (
                    <ProjectCard key={project.id || index} index={index} project={project} />
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;
