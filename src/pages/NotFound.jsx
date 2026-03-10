import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState({ player: 0, ai: 0 });
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Game Configuration
        const config = {
            paddleWidth: 8,
            paddleHeight: 60,
            ballSize: 8,
            ballSpeedX: 5,
            ballSpeedY: 5,
            aiSpeed: 4,
            playerY: canvas.height / 2 - 30,
            aiY: canvas.height / 2 - 30,
            ballX: canvas.width / 2,
            ballY: canvas.height / 2
        };

        const drawRect = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
            ctx.fillRect(x, y, w, h);
            ctx.shadowBlur = 0;
        };

        const drawCircle = (x, y, r, color) => {
            ctx.fillStyle = color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const drawNet = () => {
            for (let i = 0; i <= canvas.height; i += 30) {
                drawRect(canvas.width / 2 - 1, i, 2, 15, 'rgba(0, 240, 255, 0.2)');
            }
        };

        const resetBall = () => {
            config.ballX = canvas.width / 2;
            config.ballY = canvas.height / 2;
            config.ballSpeedX = -config.ballSpeedX;
            config.ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
        };

        const update = () => {
            // Move Ball
            config.ballX += config.ballSpeedX;
            config.ballY += config.ballSpeedY;

            // AI Paddle Movement
            if (config.aiY + config.paddleHeight / 2 < config.ballY) {
                config.aiY += config.aiSpeed;
            } else {
                config.aiY -= config.aiSpeed;
            }

            // Top and Bottom Wall Collision
            if (config.ballY - config.ballSize < 0 || config.ballY + config.ballSize > canvas.height) {
                config.ballSpeedY = -config.ballSpeedY;
            }

            // Paddle Collision Logic
            const playerCollision = (config.ballX - config.ballSize < 20 + config.paddleWidth) &&
                (config.ballY > config.playerY && config.ballY < config.playerY + config.paddleHeight);

            const aiCollision = (config.ballX + config.ballSize > canvas.width - 20 - config.paddleWidth) &&
                (config.ballY > config.aiY && config.ballY < config.aiY + config.paddleHeight);

            if (playerCollision || aiCollision) {
                let collidePoint = playerCollision ?
                    (config.ballY - (config.playerY + config.paddleHeight / 2)) :
                    (config.ballY - (config.aiY + config.paddleHeight / 2));

                collidePoint = collidePoint / (config.paddleHeight / 2);
                const angleRad = (Math.PI / 4) * collidePoint;

                const direction = playerCollision ? 1 : -1;
                let speed = Math.sqrt(config.ballSpeedX ** 2 + config.ballSpeedY ** 2);

                // Gentler speed increment and a reasonable speed cap (lower max speed)
                speed = Math.min(speed + 0.2, 10);

                config.ballSpeedX = direction * speed * Math.cos(angleRad);
                config.ballSpeedY = speed * Math.sin(angleRad);
            }

            // Scoring
            if (config.ballX - config.ballSize < 0) {
                setScore(s => ({ ...s, ai: s.ai + 1 }));
                resetBall();
            } else if (config.ballX + config.ballSize > canvas.width) {
                setScore(s => ({ ...s, player: s.player + 1 }));
                resetBall();
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawNet();
            drawRect(20, config.playerY, config.paddleWidth, config.paddleHeight, '#00f0ff');
            drawRect(canvas.width - 20 - config.paddleWidth, config.aiY, config.paddleWidth, config.paddleHeight, '#ff0055');
            drawCircle(config.ballX, config.ballY, config.ballSize, '#fff');
        };

        const gameLoop = () => {
            update();
            render();
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            config.playerY = e.clientY - rect.top - config.paddleHeight / 2;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        gameLoop();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameStarted]);

    return (
        <div className="not-found-page">
            <div className="grid-bg"></div>

            <motion.div
                className="not-found-content container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0 4rem 0' }}
            >
                <div className="pong-header">
                    <h1 className="error-title">404 - SECTOR ANOMALY</h1>
                    <p className="error-desc">Connection lost. Initializing simulation contingency...</p>
                </div>

                {!gameStarted ? (
                    <motion.button
                        className="btn-primary"
                        onClick={() => setGameStarted(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ margin: '40px 0' }}
                    >
                        INITIATE PONG PROTOCOL
                    </motion.button>
                ) : (
                    <div className="pong-game-container">
                        <div className="pong-score">
                            <span>PLAYER {score.player}</span>
                            <span>{score.ai} SYSTEM</span>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={400}
                            className="pong-canvas"
                        />
                    </div>
                )}

                <div className="error-actions" style={{ marginTop: 'auto' }}>
                    <Link to="/" className="btn-primary return-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        ABORT SIMULATION & RETURN
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
