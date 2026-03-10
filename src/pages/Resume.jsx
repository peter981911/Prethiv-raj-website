import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiArrowLeft, FiMail, FiMapPin, FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { useTransitionContext } from '../utils/TransitionEngine';
import './Resume.css';

const Resume = () => {
    const { triggerTransition } = useTransitionContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <motion.div
            className="resume-container container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="resume-toolbar no-print">
                <button className="back-btn" onClick={() => triggerTransition('/')}>
                    <FiArrowLeft /> Back to Main
                </button>
                <button className="print-btn" onClick={handlePrint}>
                    <FiPrinter /> Print to PDF
                </button>
            </div>

            <main className="resume-paper">
                <header className="resume-header">
                    <div className="resume-title-block">
                        <h1>PRETHIV RAJ M V</h1>
                        <h2>Software Developer | Secure Cloud Architectures</h2>
                    </div>
                    <div className="resume-contact-block">
                        <span><FiMapPin /> Tamil Nadu, India</span>
                        <span><FiMail /> shadow325523@gmail.com</span>
                        <span><FiLinkedin />prethiv-raj-m-v-7a1915290</span>
                        <span><FiGithub /> github.com/peter981911</span>
                    </div>
                </header>

                <div className="resume-divider"></div>

                <section className="resume-section">
                    <h3>Professional Summary</h3>
                    <p>
                        Developer interested in building scalable web applications, deploying them using modern cloud technologies, and understanding the security principles that keep systems reliable and resilient. Proven ability to design secure MERN stack systems and automate security vulnerability reconnaissance.
                    </p>
                </section>

                <section className="resume-section">
                    <h3>Core Technical Competencies</h3>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h4>Web Engineering</h4>
                            <p>React, Node.js, Express.js, MongoDB, RESTful APIs, WebGL</p>
                        </div>
                        <div className="skill-category">
                            <h4>Cloud & Security</h4>
                            <p>AWS , Azure/ Deployment, Web Security, Vulnerability Analysis, Linux</p>
                        </div>
                        <div className="skill-category">
                            <h4>Languages & Tools</h4>
                            <p>JavaScript/TypeScript, Python, C#, C, Git</p>
                        </div>
                    </div>
                </section>

                <section className="resume-section">
                    <h3>Key Projects</h3>

                    <div className="resume-item">
                        <div className="resume-item-header">
                            <h4>NGO Relief Distribution System</h4>
                            <span className="tech-stack">React, Node.js, Express, MongoDB</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>Designed and deployed a cloud-based monolithic MERN application to manage complex relief distributions securely.</li>
                            <li>Implemented strict Role-Based Access Control (RBAC) to segment administrative workflows from volunteers.</li>
                            <li>Engineered the database schema to handle high-concurrency writes with zero data duplication.</li>
                        </ul>
                    </div>

                    <div className="resume-item">
                        <div className="resume-item-header">
                            <h4>Web Vulnerability Scanner</h4>
                            <span className="tech-stack">Python, Flask, Multi-threading</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>Developed a Python engine to conduct non-destructive automated security reconnaissance on target domains.</li>
                            <li>Orchestrated concurrent payload testing using python multi-threading to speed up audit times by 300%.</li>
                            <li>Integrated OWASP Top 10 heuristics to automatically generate risk reports based on exposed HTTP headers.</li>
                        </ul>
                    </div>

                    <div className="resume-item">
                        <div className="resume-item-header">
                            <h4>Ayiram (Finance Tracker)</h4>
                            <span className="tech-stack">C#, .NET, Entity Framework Core</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>Engineered a highly performant desktop ledger for personal finance categorization.</li>
                            <li>Leveraged Entity Framework Core to orchestrate complex database migrations and relational data masking.</li>
                            <li>Utilized the Repository Design Pattern to decouple business logic from strict data persistence logic.</li>
                        </ul>
                    </div>
                </section>

            </main>
        </motion.div>
    );
};

export default Resume;
