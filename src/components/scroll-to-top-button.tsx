'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Optional: Add visibility toggle based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <button 
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-light rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
        >
            <i className='bx bx-chevron-up text-xl'></i>
        </button>
    );
}