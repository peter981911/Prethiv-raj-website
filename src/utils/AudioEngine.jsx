import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const droneRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [frequencyData, setFrequencyData] = useState(new Uint8Array(0));
    const [volume, setVolume] = useState(0.5);

    // Set up the Web Audio API context
    const initializeAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();

            // Create analyser
            analyserRef.current = audioCtxRef.current.createAnalyser();
            analyserRef.current.fftSize = 128; // Small FFT for performance and chunky visuals
            analyserRef.current.smoothingTimeConstant = 0.85;
            setFrequencyData(new Uint8Array(analyserRef.current.frequencyBinCount));
        }

        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const startSynthesizedDrone = () => {
        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume;

        // Connect to analyser and then destination
        masterGain.connect(analyserRef.current);
        analyserRef.current.connect(ctx.destination);

        const nodesToClean = [];

        // 1. Deep Bass Sub-Bass Sine
        const subOsc = ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.value = 43.65; // F1
        const subGain = ctx.createGain();
        subGain.gain.value = 0.8;
        subOsc.connect(subGain);
        subGain.connect(masterGain);
        nodesToClean.push(subOsc, subGain);

        // 2. Mid Drone Sawtooth (rich harmonics for visualizer)
        const midOsc = ctx.createOscillator();
        midOsc.type = 'sawtooth';
        midOsc.frequency.value = 87.31; // F2
        const midGain = ctx.createGain();
        midGain.gain.value = 0.2;

        // Filter for the sawtooth to make it sound "ambient" and dark
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        filter.Q.value = 2;

        midOsc.connect(filter);
        filter.connect(midGain);
        midGain.connect(masterGain);
        nodesToClean.push(midOsc, filter, midGain);

        // 3. LFO to modulate filter cutoff for "breathing" effect
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05; // 20s cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 600; // Sweep range
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        nodesToClean.push(lfo, lfoGain);

        // 4. Noise generator for texture (makes high freq bars react)
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1000;
        noiseFilter.Q.value = 1;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.03; // Very subtle

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        nodesToClean.push(noiseSrc, noiseFilter, noiseGain);

        // Start everything
        subOsc.start();
        midOsc.start();
        lfo.start();
        noiseSrc.start();

        return {
            masterGain,
            stop: () => {
                const fadeOutTime = 2.0;
                masterGain.gain.setTargetAtTime(0, ctx.currentTime, fadeOutTime / 3);

                setTimeout(() => {
                    subOsc.stop();
                    midOsc.stop();
                    lfo.stop();
                    noiseSrc.stop();
                    nodesToClean.forEach(n => n.disconnect());
                }, fadeOutTime * 1000);
            }
        };
    };

    // Animation loop for FFT data extraction
    useEffect(() => {
        let animationFrame;
        const updateData = () => {
            if (isPlaying && analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                setFrequencyData(dataArray);
            }
            animationFrame = requestAnimationFrame(updateData);
        };

        updateData();
        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying]);

    useEffect(() => {
        if (droneRef.current) {
            droneRef.current.masterGain.gain.value = volume;
        }
    }, [volume]);

    const playPauseString = () => {
        initializeAudio();

        if (isPlaying) {
            if (droneRef.current) {
                droneRef.current.stop();
                droneRef.current = null;
            }
            setIsPlaying(false);
        } else {
            audioCtxRef.current.resume().then(() => {
                droneRef.current = startSynthesizedDrone();
                setIsPlaying(true);
            });
        }
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            frequencyData,
            toggleAudio: playPauseString,
            setVolume,
            volume
        }}>
            {children}
        </AudioContext.Provider>
    );
};
