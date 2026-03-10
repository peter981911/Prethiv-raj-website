import { useState, useEffect } from 'react';

// The classic Konami Code sequence
const konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

export const useKonamiCode = () => {
    // This state tracks whether the code has been successfully entered
    const [isTriggered, setIsTriggered] = useState(false);
    // This state keeps a running memory of the keys the user presses
    const [inputSequence, setInputSequence] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Add the new key to the sequence
            setInputSequence((prevSequence) => {
                const newSequence = [...prevSequence, e.key];

                // Keep the sequence array the same length as our secret code
                // so memory doesn't grow infinitely if they type a bunch of stuff
                if (newSequence.length > konamiSequence.length) {
                    newSequence.shift();
                }

                // Compare our current sequence string against the target sequence string
                if (newSequence.join(',') === konamiSequence.join(',')) {
                    setIsTriggered(prev => !prev);
                    return []; // Reset sequence after successful entry to allow toggling off
                }

                return newSequence;
            });
        };

        // Custom Mobile Trigger Listener
        const handleCustomTrigger = () => {
            setIsTriggered(prev => !prev);
        };

        // Attach the listener to the global window
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('konamiDesecret', handleCustomTrigger);

        // Cleanup function so we don't cause memory leaks when components unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('konamiDesecret', handleCustomTrigger);
        };
    }, []);

    // Timer logic to revert the code effect automatically
    useEffect(() => {
        let timer;
        if (isTriggered) {
            timer = setTimeout(() => {
                setIsTriggered(false);
                setInputSequence([]); // clear the memory buffer
            }, 20000); // 20 second duration
        }
        return () => clearTimeout(timer);
    }, [isTriggered]);

    return isTriggered;
};
