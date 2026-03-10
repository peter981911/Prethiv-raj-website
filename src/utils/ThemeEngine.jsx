import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const themes = {
    nexus: {
        '--bg-dark': '#050505',
        '--bg-card': 'rgba(20, 20, 25, 0.6)',
        '--text-primary': '#ffffff',
        '--text-secondary': '#a0a0ab',
        '--accent-cyan': '#00f0ff',
        '--accent-violet': '#8a2be2',
        '--accent-pink': '#ff007f',
        '--gradient-neon': 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
        '--gradient-glow': 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(138, 43, 226, 0.2))',
    },
    matrix: {
        '--bg-dark': '#010501',
        '--bg-card': 'rgba(0, 30, 0, 0.8)',
        '--text-primary': '#00ff41',
        '--text-secondary': '#008f11',
        '--accent-cyan': '#00ff41',
        '--accent-violet': '#006400',
        '--accent-pink': '#00ff41',
        '--gradient-neon': 'linear-gradient(90deg, #008f11, #00ff41)',
        '--gradient-glow': 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 143, 17, 0.2))',
    },
    cyberpunk: {
        '--bg-dark': '#0f0518',
        '--bg-card': 'rgba(40, 0, 60, 0.6)',
        '--text-primary': '#fcee0a',
        '--text-secondary': '#00ffff',
        '--accent-cyan': '#fcee0a',
        '--accent-violet': '#00ffff',
        '--accent-pink': '#ff003c',
        '--gradient-neon': 'linear-gradient(90deg, #fcee0a, #ff003c)',
        '--gradient-glow': 'linear-gradient(135deg, rgba(252, 238, 10, 0.2), rgba(255, 0, 60, 0.2))',
    },
    dracula: {
        '--bg-dark': '#282a36',
        '--bg-card': 'rgba(68, 71, 90, 0.6)',
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#6272a4',
        '--accent-cyan': '#8be9fd',
        '--accent-violet': '#bd93f9',
        '--accent-pink': '#ff79c6',
        '--gradient-neon': 'linear-gradient(90deg, #8be9fd, #bd93f9)',
        '--gradient-glow': 'linear-gradient(135deg, rgba(139, 233, 253, 0.2), rgba(189, 147, 249, 0.2))',
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('nexus'); // Default

    const changeTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
        }
    };

    useEffect(() => {
        const root = document.documentElement;
        const targetTheme = themes[currentTheme];

        if (targetTheme) {
            // Apply all variables of the selected theme to the root element
            Object.entries(targetTheme).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, changeTheme, availableThemes: Object.keys(themes) }}>
            <div data-theme={currentTheme} style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
