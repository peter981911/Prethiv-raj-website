import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '40px 0',
            marginTop: '80px',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    <span className="text-gradient">PRETHIV RAJ</span> M V &copy; {new Date().getFullYear()}
                </div>

                <div style={{
                    display: 'flex',
                    gap: '24px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    <a href="https://github.com/peter981911" style={{ transition: 'color 0.3s' }} className="hover-white">GitHub</a>
                    <a href="https://www.linkedin.com/in/prethiv-raj-m-v-7a1915290" style={{ transition: 'color 0.3s' }} className="hover-white">LinkedIn</a>
                    <a href="https://x.com/quantumtoast_98" style={{ transition: 'color 0.3s' }} className="hover-white">Twitter</a>
                </div>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Engineered with <span style={{ color: 'var(--accent-pink)' }}>♥</span> and React.
                </div>
            </div>

            <style>{`
        .hover-white:hover { color: var(--text-primary); }
      `}</style>
        </footer>
    );
};

export default Footer;
