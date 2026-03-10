import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projectsData } from '../data/projectsData';
import { useTransitionContext } from '../utils/TransitionEngine';
import LiquidImage from '../components/LiquidImage';
import LiveCodeBlock from '../components/LiveCodeBlock';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { triggerTransition } = useTransitionContext();
    const [project, setProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Always start at top
        const foundProject = projectsData.find(p => p.id === id);
        if (foundProject) {
            setProject(foundProject);
        } else {
            // Project not found, boot back to home
            navigate('/');
        }
    }, [id, navigate]);

    if (!project) return null;

    return (
        <motion.div
            className="project-study-container container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Header & Navigation */}
            <div className="study-header">
                <button
                    className="back-btn"
                    onClick={() => triggerTransition('/')}
                >
                    <FiArrowLeft /> Back to Main Terminal
                </button>
            </div>

            {/* Case Study Title & Meta */}
            <div className="study-hero">
                <h1 className="study-title"><span className="text-gradient">{project.title}</span></h1>
                <p className="study-description">{project.description}</p>
                <div className="study-links">
                    {project.github && project.github !== 'https://github.com/peter981911' && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="study-link">
                            <FiGithub /> Source Code
                        </a>
                    )}
                    {project.external && project.external !== 'https://github.com/peter981911' && (
                        <a href={project.external} target="_blank" rel="noreferrer" className="study-link">
                            <FiExternalLink /> Live Deployment
                        </a>
                    )}
                </div>
            </div>

            {/* Featured Image */}
            <div className="study-banner">
                <LiquidImage src={project.image} alt={project.title} />
            </div>

            {/* Technology Stack Tags */}
            <div className="study-tech">
                {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                ))}
            </div>

            {/* In-Depth Case Study Sections */}
            {project.caseStudy && (
                <div className="study-content">
                    <section className="study-section">
                        <h2>The Problem</h2>
                        <div className="section-line"></div>
                        <p>{project.caseStudy.problem}</p>
                    </section>

                    <section className="study-section">
                        <h2>System Architecture</h2>
                        <div className="section-line"></div>
                        <p>{project.caseStudy.architecture}</p>
                    </section>

                    <section className="study-section">
                        <h2>Key Learnings</h2>
                        <div className="section-line"></div>
                        <p>{project.caseStudy.learnings}</p>
                    </section>

                    {project.liveCode && (
                        <section className="study-section">
                            <h2>Interactive Simulator</h2>
                            <div className="section-line"></div>
                            <p>Edit the simulated backend logic below and run it to see the theoretical output.</p>
                            <LiveCodeBlock
                                language={project.liveCode.language}
                                initialCode={project.liveCode.initialCode}
                                mockOutput={project.liveCode.mockOutput}
                            />
                        </section>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default ProjectDetails;
