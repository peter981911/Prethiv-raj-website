// Initialize Web Audio API context only when needed to obey browser autoplay policies
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

// Subtle, high-frequency digital blip for hovering over elements
export const playHoverSound = () => {
    try {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // High-tech quick pip sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

        // Very low volume, fast fade out
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.warn("Audio play blocked or unavailable.", e);
    }
};

// Solid, slightly lower-pitched satisfying digital click
export const playClickSound = () => {
    try {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Square wave for a more textured 'click'
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

        // Slightly higher volume than hover
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
        console.warn("Audio play blocked or unavailable.", e);
    }
};
