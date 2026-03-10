import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AudioProvider } from './utils/AudioEngine.jsx'
import { ThemeProvider } from './utils/ThemeEngine.jsx'
import { TransitionProvider } from './utils/TransitionEngine.jsx'

const consoleArt = [
  "",
  " ██████╗ ██████╗ ███████╗████████╗██╗  ██╗██╗██╗   ██╗    ██████╗  █████╗ ██╗",
  " ██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║  ██║██║██║   ██║    ██╔══██╗██╔══██╗██║",
  " ██████╔╝██████╔╝█████╗     ██║   ███████║██║██║   ██║    ██████╔╝███████║██║",
  " ██╔═══╝ ██╔══██╗██╔══╝     ██║   ██╔══██║██║╚██╗ ██╔╝    ██╔══██╗██╔══██║██║",
  " ██║     ██║  ██║███████╗   ██║   ██║  ██║██║ ╚████╔╝     ██║  ██║██║  ██║██║",
  " ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝      ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝",
  "",
  " [SYSTEM INITIALIZED]",
  " >> Welcome to the source, Developer.",
  " >> If you're reading this, you know where to look.",
  " >> Repo: https://github.com/peter981911",
  " >> Contact: prethivraj2005@gmail.com"
].join('\n');

console.log(
  `%c${consoleArt}`,
  'color: #00f0ff; font-family: monospace; font-size: 10px; font-weight: bold; text-shadow: 0 0 5px #00f0ff;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <ThemeProvider>
          <TransitionProvider>
            <App />
          </TransitionProvider>
        </ThemeProvider>
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>,
)
