'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const goToSearch = () => {
        if (searchQuery.trim() !== '') {
            setIsMobileMenuOpen(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            goToSearch();
        }
    };

    // Close mobile menu when navigating
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className="bg-white shadow-sm text-black px-4 py-5 w-full sticky top-0 z-50">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a 
                                href="/" 
                                className="flex items-center select-none">
                                <span className="text-lg md:text-2xl lg:text-4xl font-maven font-bold text-dark">Trans</span>
                                <span className="text-lg md:text-2xl lg:text-4xl font-maven font-bold text-blue-500">Lyrics</span>
                            </a>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
                                {!isMobileMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 min-w-0">
                            <div className="flex items-center space-x-1 xl:space-x-4">
                                <div className="flex space-x-1 xl:space-x-4 mr-4 select-none">
                                    {['/', '/artists', '/albums', '/songs'].map((path) => {
                                        const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
                                        return (
                                            <a
                                                key={path}
                                                href={path}
                                                className={`px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap 
                                                    ${pathname === path ? 'text-blue-500' : 'text-dark hover:text-blue-600'}`}>
                                                {label}
                                            </a>
                                        );
                                    })}
                                </div>

                                {/* Search */}
                                <div className="flex items-center space-x-2 xl:space-x-4">
                                    <div className="relative w-48 lg:w-64 xl:w-80">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="search songs, albums, or artists"
                                            className="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"/>
                                        <button
                                            onClick={goToSearch}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <i className='bx bx-search'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden fixed top-[4.5rem] left-0 right-0 bg-white shadow-lg z-50 p-4">
                            {/* Mobile Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="search songs, albums, or artists"
                                    className="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"/>
                                <button
                                    onClick={goToSearch}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <i className='bx bx-search'></i>
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col">
                                {['/', '/artists', '/albums', '/songs'].map((path) => {
                                    const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
                                    return (
                                        <a
                                            key={path}
                                            href={path}
                                            className="text-dark hover:text-blue-600 px-3 py-1 mt-4 text-lg font-semibold">
                                            {label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}