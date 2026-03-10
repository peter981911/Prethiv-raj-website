import { useEffect } from 'react';

const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal;
