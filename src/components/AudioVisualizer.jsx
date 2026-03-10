import React from 'react';
import { motion } from 'framer-motion';
import { useAudioContext } from '../utils/AudioEngine';
import './AudioVisualizer.css';

const AudioVisualizer = () => {
    const { isPlaying, frequencyData } = useAudioContext();

    if (!isPlaying) return null;

    // We only want the first 16 or so bass/mid bands for a cool minimal visualizer
    const displayData = Array.from(frequencyData).slice(0, 16);

    return (
        <motion.div
            className="audio-visualizer-dock"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <div className="vis-header">
                <span className="vis-title">AUDIO_LINK: <span className="text-gradient">ACTIVE</span></span>
            </div>
            <div className="vis-bars-container">
                {displayData.map((value, index) => {
                    // scale 0-255 to 10-100% height
                    const height = Math.max(10, (value / 255) * 100);

                    return (
                        <div
                            key={index}
                            className="vis-bar"
                            style={{
                                height: `${height}%`,
                                opacity: 0.5 + (value / 255) * 0.5,
                                // Glow more intensity based on volume value
                                boxShadow: `0 0 ${value / 10}px rgba(0, 240, 255, ${value / 255})`
                            }}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default AudioVisualizer;
