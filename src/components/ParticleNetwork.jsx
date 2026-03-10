import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const config = {
            particleCount: 50,
            particleRadius: 1.5,
            linkColor: 'rgba(0, 240, 255, 0.15)',
            particleColor: 'rgba(138, 43, 226, 0.4)',
            linkDistance: 150,
            mouseDistance: 200,
            speed: 0.5
        };

        const particles = [];
        let mouse = { x: -1000, y: -1000 };

        // Easter Egg Physics Breaker Variables
        let clickCount = 0;
        let lastClickTime = 0;
        let isBroken = false;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * config.speed;
                this.vy = (Math.random() - 0.5) * config.speed;
                this.radius = config.particleRadius;
            }

            update() {
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse repel physics or Broken explosion
                if (isBroken) {
                    // Particles aggressively flee toward the edges
                    const dx = this.x - (canvas.width / 2);
                    const dy = this.y - (canvas.height / 2);
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * 0.5;
                    this.vy += Math.sin(angle) * 0.5;
                } else {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (config.mouseDistance - distance) / config.mouseDistance;

                        this.x -= forceDirectionX * force * 2;
                        this.y -= forceDirectionY * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = config.particleColor;
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            particles.length = 0;
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw
            particles.forEach(p => p.update());

            // Draw links
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.linkDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / config.linkDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleClick = () => {
            const now = Date.now();
            if (now - lastClickTime < 500) {
                clickCount++;
            } else {
                clickCount = 1;
            }
            lastClickTime = now;

            if (clickCount >= 5 && !isBroken) {
                isBroken = true;
                // Add a visual flash to the canvas layer
                canvas.style.filter = 'hue-rotate(180deg) brightness(2)';

                // Explode outwards
                particles.forEach(p => {
                    p.vx *= 10;
                    p.vy *= 10;
                });

                // Recover after 3 seconds
                setTimeout(() => {
                    isBroken = false;
                    canvas.style.filter = 'none';
                    // Re-normalize speeds
                    particles.forEach(p => {
                        p.vx = (Math.random() - 0.5) * config.speed;
                        p.vy = (Math.random() - 0.5) * config.speed;
                    });
                }, 3000);
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticleNetwork;
