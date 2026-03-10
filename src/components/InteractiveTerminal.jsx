import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAudioContext } from '../utils/AudioEngine';
import { useThemeContext } from '../utils/ThemeEngine';
import { useTransitionContext } from '../utils/TransitionEngine';
import './InteractiveTerminal.css';

const InteractiveTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { type: 'output', text: 'Terminal initialized. Type "help" for a list of available commands.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const terminalEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleAudio, isPlaying } = useAudioContext();
    const { currentTheme, changeTheme, availableThemes } = useThemeContext();
    const { triggerTransition } = useTransitionContext();

    // Toggle terminal on ~ or `
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll to bottom when history changes
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output = '';

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div>
                        Available commands:<br />
                        <span className="term-highlight">about</span>    - Display profile information<br />
                        <span className="term-highlight">projects</span> - Navigate to the projects sector<br />
                        <span className="term-highlight">contact</span>  - Establish communication<br />
                        <span className="term-highlight">theme</span>    - Manage system aesthetic overrides<br />
                        <span className="term-highlight">/music on</span>- Initialize ambient soundtrack<br />
                        <span className="term-highlight">/music off</span>- Terminate ambient soundtrack<br />
                        <span className="term-highlight">clear</span>    - Clear terminal history<br />
                        <span className="term-highlight">exit</span>     - Close the terminal<br />
                        <span className="term-highlight">sudo</span>     - Superuser access
                    </div>
                );
                break;
            case 'sudo rm -rf /':
            case 'sudo rm -rf':
            case 'sudo rm -rf /*':
                output = (
                    <span style={{ color: 'var(--accent-magenta)' }}>
                        Initiating catastrophic system wipe. Godspeed.
                    </span>
                );
                // Dispatch event to trigger the fake crash in App.jsx
                window.dispatchEvent(new Event('systemDeleteMode'));
                break;
            case 'about':
                output = 'PRETHIV RAJ M V | Software Developer. Specialized in scalable web applications, cloud technologies, and cybersecurity.';
                break;
            case 'projects':
                if (location.pathname === '/') {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                    triggerTransition('/');
                    setTimeout(() => {
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 800);
                }
                output = 'Navigating to [Projects] sector...';
                break;
            case 'contact':
                if (location.pathname === '/') {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                    triggerTransition('/');
                    setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 800);
                }
                output = 'Navigating to [Contact] sector...';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                setIsOpen(false);
                output = 'Terminating session...';
                break;
            case 'sudo':
            case 'sudo rm -rf /':
                output = <span style={{ color: '#ff3366' }}>ACCESS DENIED. Subject activity logged and reported.</span>;
                break;
            case 'theme':
            case 'themes':
            case 'theme list':
                output = (
                    <div>
                        [THEME_MANAGER] Available protocols: <br />
                        {availableThemes.map(t => (
                            <span key={t} style={{ display: 'block', paddingLeft: '1rem', color: currentTheme === t ? 'var(--accent-cyan)' : 'inherit' }}>
                                - {t} {currentTheme === t ? '(ACTIVE)' : ''}
                            </span>
                        ))}
                        <br />Usage: <span className="term-highlight">theme [name]</span>
                    </div>
                );
                break;
            case '/music':
            case '/music on':
            case 'music on':
                if (!isPlaying) toggleAudio();
                output = <span style={{ color: 'var(--accent-cyan)' }}>[AUDIO_LINK] Ambient soundscape engaged.</span>;
                break;
            case '/music off':
            case 'music off':
                if (isPlaying) toggleAudio();
                output = '[AUDIO_LINK] Soundscape terminated.';
                break;
            case '':
                break;
            default:
                if (trimmedCmd.startsWith('theme ')) {
                    const requestedTheme = trimmedCmd.split(' ')[1];
                    if (availableThemes.includes(requestedTheme)) {
                        changeTheme(requestedTheme);
                        output = <span style={{ color: 'var(--accent-cyan)' }}>[THEME_MANAGER] Protocol override successful: {requestedTheme.toUpperCase()}</span>;
                    } else {
                        output = `[THEME_MANAGER] Protocol not found: ${requestedTheme}. Type 'theme' to see availability.`;
                    }
                } else {
                    output = `Command not recognized: '${trimmedCmd}'. Type "help" for a list of commands.`;
                }
                break;
        }

        if (trimmedCmd !== 'clear') {
            setHistory(prev => [
                ...prev,
                { type: 'input', text: cmd },
                ...(output ? [{ type: 'output', text: output }] : [])
            ]);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleCommand(inputValue);
        setInputValue('');
    };

    return (
        <>
            {/* Minimal hint token */}
            <div
                className={`terminal-hint ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open Interactive Terminal"
            >
                <span>[~] Terminal</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="interactive-terminal glass-panel"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span
                                    className="dot red"
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Close Terminal"
                                ></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <span className="terminal-title">guest@prethiv-raj: /nexus</span>
                        </div>

                        <div className="terminal-window">
                            {history.map((entry, i) => (
                                <div key={i} className={`term-line term-${entry.type}`}>
                                    {entry.type === 'input' && <span className="term-prompt">❯</span>}
                                    <span className="term-content">{entry.text}</span>
                                </div>
                            ))}
                            <div ref={terminalEndRef} />
                        </div>

                        <form className="terminal-input-form" onSubmit={onSubmit}>
                            <span className="term-prompt">❯</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="term-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoCapitalize="off"
                                autoComplete="off"
                                spellCheck="false"
                                aria-label="Terminal command input"
                            />
                            <span className="blinking-cursor" aria-hidden="true"></span>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InteractiveTerminal;
