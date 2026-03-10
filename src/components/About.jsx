import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArchitectureDiagram from './ArchitectureDiagram';
import GithubMatrix from './GithubMatrix';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const terminalY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
    const terminalScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
    const skills = [
        { category: "Web Engineering", items: ["React", "Node.js", "Express.js", "MongoDB", "RESTful APIs"] },
        { category: "Cloud & Security", items: ["AWS / Deployment", "Web Security", "Vulnerability Analysis", "Linux"] },
        { category: "Core Technologies", items: ["JavaScript/TypeScript", "Python", "C#", "C", "Git"] }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section ref={sectionRef} className="section container" id="about">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">System <span className="text-gradient">Profile</span></h2>
                <div className="section-line"></div>
            </motion.div>

            <div className="about-grid">
                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.h3 className="about-subtitle" variants={itemVariants}>Software Developer | Cybersecurity Enthusiast</motion.h3>
                    <motion.p className="about-text" variants={itemVariants}>
                        I am a developer who enjoys building modern web applications and understanding the systems that power them. My work focuses on developing full-stack applications, exploring cloud infrastructure for deployment and scalability, and learning the security principles that help protect real-world systems.
                    </motion.p>
                    <motion.p className="about-text" variants={itemVariants}>
                        I enjoy working across the stack ,  backend logic to understanding how applications run in cloud environments. At the same time, I explore cybersecurity concepts and CTF challenges to better understand vulnerabilities and how systems can be designed more securely.
                    </motion.p>
                    <motion.p className="about-text" variants={itemVariants}>
                        My goal is to become a well-rounded engineer who can not only build software, but also understand how it scales, performs, and stays secure in production environments.
                    </motion.p>
                    <motion.div className="about-stats" variants={itemVariants}>
                        <div className="stat-box">
                            <span className="stat-number text-gradient">.....</span>
                            <span className="stat-label">Fresher</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number text-gradient"> 3+</span>
                            <span className="stat-label">Projects Completed</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="about-skills-terminal glass-panel"
                    style={{ y: terminalY, scale: terminalScale }}
                >
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <span className="terminal-title">capabilities.sh</span>
                    </div>
                    <div className="terminal-body">
                        {skills.map((skillGroup, index) => (
                            <div key={index} className="skill-group">
                                <span className="code-comment"># {skillGroup.category}</span>
                                <div className="skill-tags">
                                    {skillGroup.items.map((item, i) => (
                                        <span key={i} className="skill-tag">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <ArchitectureDiagram />
            <GithubMatrix />
        </section>
    );
};

export default About;
