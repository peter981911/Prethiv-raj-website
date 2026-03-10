import React, { useState, useRef } from 'react';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import MagneticElement from './MagneticElement';
import './Contact.css';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs.sendForm(
            'service_em9fpfm',
            'template_30oa70h',
            formRef.current,
            'wPzJa8fhg2wK707T6'
        )
            .then((result) => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            }, (error) => {
                setIsSubmitting(false);
                console.error('Email sending failed:', error.text);
                alert('Transmission failed. The communication relays might be down. Please try again.');
            });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <section className="section container" id="contact">
            <div className="section-header reveal-up">
                <h2 className="section-title">Establish <span className="text-gradient">Connection</span></h2>
                <div className="section-line"></div>
            </div>

            <div className="contact-container reveal-up">
                <div className="contact-info">
                    <h3 className="contact-subtitle">Let's build something extraordinary.</h3>
                    <p className="contact-text">
                        Whether you have a question, a project proposition, or just want to say hi, my inbox is always open.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon"><FiMail size={24} /></div>
                            <span>shadow325523@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><FiMapPin size={24} /></div>
                            <span>Tamil Nadu, India</span>
                        </div>
                    </div>

                    <div className="social-dock">
                        <MagneticElement force={0.3}><a href="https://github.com/peter981911" className="social-link"><FiGithub size={22} /></a></MagneticElement>
                        <MagneticElement force={0.3}><a href="https://www.linkedin.com/in/prethiv-raj-m-v-7a1915290" className="social-link"><FiLinkedin size={22} /></a></MagneticElement>
                        <MagneticElement force={0.3}><a href="https://x.com/quantumtoast_98" className="social-link"><FiTwitter size={22} /></a></MagneticElement>
                    </div>
                </div>

                <div className="contact-form-wrapper glass-panel">
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder=" "
                                value={formState.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name" className="form-label">Name</label>
                            <div className="input-glow"></div>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder=" "
                                value={formState.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-glow"></div>
                        </div>

                        <div className="form-group">
                            <textarea
                                id="message"
                                name="message"
                                className="form-input form-textarea"
                                placeholder=" "
                                value={formState.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <label htmlFor="message" className="form-label">Message</label>
                            <div className="input-glow"></div>
                        </div>

                        <MagneticElement force={0.15}>
                            <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Transmitting...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                                {!isSubmitting && !isSubmitted && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                )}
                            </button>
                        </MagneticElement>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
