import React, { useEffect, useState } from 'react';
import DefaultEditor from 'react-simple-code-editor';
const Editor = DefaultEditor.default || DefaultEditor;
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import './LiveCodeBlock.css';

const LiveCodeBlock = ({ initialCode, language = "javascript", mockOutput = "Success: Module executed gracefully." }) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState("");
    const [displayedOutput, setDisplayedOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    // Typewriter effect for the output string
    useEffect(() => {
        if (!output) {
            setDisplayedOutput("");
            return;
        }

        let i = 0;
        setDisplayedOutput(""); // Reset

        const typeChar = () => {
            if (i < output.length) {
                setDisplayedOutput((prev) => prev + output.charAt(i));
                i++;
                // Random typing delay between 10ms and 40ms
                setTimeout(typeChar, Math.random() * 30 + 10);
            }
        };

        typeChar();
    }, [output]);

    const handleRun = () => {
        setIsRunning(true);
        setOutput("");

        // Simulate execution delay
        setTimeout(() => {
            setIsRunning(false);
            // We simulate the output. In a real environment, you'd use a sandboxed Web Worker or API to execute safe code evaluated.
            setOutput(`> Executing runtime environments...\n> ${mockOutput}`);
        }, 1200);
    };

    const highlightCode = (code) => {
        return Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
        );
    };

    return (
        <div className="live-code-container glass-panel">
            <div className="code-header">
                <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <span className="lang-badge">{language}</span>
            </div>

            <div className="editor-wrapper">
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlightCode(code)}
                    padding={20}
                    style={{
                        fontFamily: '"Fira Code", "Space Mono", monospace',
                        fontSize: 14,
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)'
                    }}
                    className="live-editor"
                />
            </div>

            <div className="code-actions">
                <button
                    className={`run-btn ${isRunning ? 'running' : ''}`}
                    onClick={handleRun}
                    disabled={isRunning}
                >
                    {isRunning ? 'Compiling...' : 'Run Simulation'}
                </button>
            </div>

            {output && (
                <div className="code-output">
                    <div className="output-header">console_output.log</div>
                    <pre className="output-body">
                        {displayedOutput}
                        <span className="typing-cursor">_</span>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default LiveCodeBlock;
