import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
    useMotionValue,
    useAnimationFrame
} from 'framer-motion';
import './Marquee.css';

// Inline wrap helper — avoids importing from internal @motionone/utils
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const MarqueeItem = ({ children, baseVelocity = 100, filled = false }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`marquee ${filled ? 'filled' : ''}`}>
            <motion.div className="scroller" style={{ x }}>
                <span>{children}&nbsp;</span>
                <span>{children}&nbsp;</span>
                <span>{children}&nbsp;</span>
                <span>{children}&nbsp;</span>
            </motion.div>
        </div>
    );
};

const Marquee = () => {
    return (
        <section className="marquee-section">
            <div className="marquee-glow-top"></div>
            <MarqueeItem baseVelocity={-2}>
                FULL STACK DEVELOPMENT <span className="marquee-dot">✦</span> CLOUD SYSTEMS <span className="marquee-dot">✦</span> APPLICATION SECURITY <span className="marquee-dot">✦</span> PROBLEM SOLVING <span className="marquee-dot">✦</span>
            </MarqueeItem>
            <MarqueeItem baseVelocity={2} filled={true}>
                REACT <span className="marquee-dot">✦</span> NODEJS <span className="marquee-dot">✦</span> PYTHON <span className="marquee-dot">✦</span> LINUX <span className="marquee-dot">✦</span> SOFTWARE ENGINEERING <span className="marquee-dot">✦</span> SYSTEMS ARCHITECTURE <span className="marquee-dot">✦</span>
            </MarqueeItem>
            <div className="marquee-glow-bottom"></div>
        </section>
    );
};

export default Marquee;
