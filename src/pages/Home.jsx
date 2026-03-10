import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
    // Initialize the scroll reveal observer for components on this page
    useScrollReveal();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="home-page"
        >
            <main>
                <Hero />
                <Marquee />
                <About />
                <Projects />
                <Contact />
            </main>
        </motion.div>
    );
};

export default Home;
