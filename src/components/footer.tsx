'use client';

import React, { useState } from 'react';

export default function Footer() {
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    // State management
    const [form, setForm] = useState({
        name: '',
        content: '',
        isAnonymous: false
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [formErrors, setFormErrors] = useState({
        name: '',
        content: ''
    });

    // Get current year
    const currentYear = new Date().getFullYear();

    // Validate name
    const validateName = () => {
        if (form.name === "") {
            setFormErrors(prev => ({ ...prev, name: 'Name cannot empty' }));
            return false;
        }
        if (form.name.length > 30) {
            setFormErrors(prev => ({ ...prev, name: 'Max 30 characters' }));
            return false;
        }
        setFormErrors(prev => ({ ...prev, name: '' }));
        return true;
    };

    const validateForm = () => {
        if (form.content === "") {
            return false;
        }
        if (form.content.length > 100) {
            return false;
        }
        setFormErrors(prev => ({ ...prev, content: '' }));
        return true;
    };

    // Handle name and anonymous checkbox
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, name: e.target.value }));
        validateName();
    };

    const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isAnonymous = e.target.checked;
        setForm(prev => ({
            ...prev,
            isAnonymous,
            name: isAnonymous ? 'Anonymous' : ''
        }));
    };

    // Show notification
    const showNotificationResult = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateName()) return;

        if (!validateForm()) return;


        try {
            const body = {
                name: form.isAnonymous ? 'Anonymous' : form.name,
                content: form.content
            }
            const res = await fetch(`${backendApiUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (res.status) {
                showNotificationResult('Comment sent successfully');

                // Reset form
                setForm({
                    name: '',
                    content: '',
                    isAnonymous: false
                });

                await new Promise(resolve => setTimeout(resolve, 2000)); // Delay 2s
            }
        } catch {
            showNotificationResult('an unknown error occurred');
        }
    };

    return (
        <footer className="relative w-full bg-dark py-4 px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Notification */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 border-b-4 border-blue-500 rounded shadow-lg transition-transform duration-[1s,15s] ease-out translate-x-0 animate-slide-in">
                    <div className="bg-light text-center px-6 py-2">
                        <p className="text-lg font-semibold text-dark select-none">{notificationMessage}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-start">
                {/* Brand */}
                <div className="flex flex-row md:flex-col gap-4 items-start">
                    <div className="flex items-center">
                        <div className="bg-white w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20 rounded-lg shadow-md">
                            <div className="aspect-square relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/translyrics-logo.png"
                                        alt="TransLyrics"
                                        className="w-4 md:w-6 lg:w-8 xl:10 select-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-2 select-none">
                            <p className="text-lg md:text-xl lg:text-2xl font-maven font-bold text-light">
                                Trans<span className="text-blue-500">Lyrics</span>
                            </p>
                            <p className="text-xs md:text-sm font-normal text-light">
                                Explore lyrics translations
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-row md:flex-col gap-4 items-center md:items-start justify-center md:justify-start my-6 md:my-0 text-base text-light select-none">
                    {['/', '/artists', '/albums', '/songs', '/about'].map((path) => {
                        const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
                        return (
                            <a
                                key={path}
                                href={path}
                                className="hover:text-blue-300"
                            >
                                {label}
                            </a>
                        );
                    })}
                </nav>

                {/* Forms */}
                <div className="flex flex-col gap-2 items-start">
                    <p className="text-base md:text-lg font-medium text-light select-none">
                        Comment or request translyrics
                    </p>

                    <form className="w-full" onSubmit={handleSubmit}>
                        {/* Name and Checkbox */}
                        <div className="mb-2 flex flex-row gap-2">
                            <div className="w-full">
                                <input
                                    type="text"
                                    id="input-name"
                                    value={form.name}
                                    onChange={handleNameChange}
                                    placeholder="name"
                                    disabled={form.isAnonymous}
                                    className={`
                                        px-3 py-1.5 text-dark text-base rounded focus:outline-none w-full
                                        ${form.isAnonymous ? 'bg-gray-200' : 'bg-light'}
                                        ${formErrors.name ? 'border border-red-500' : ''}
                                    `}
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                                )}
                            </div>

                            <div className="flex items-center w-full">
                                <input
                                    id="checkbox-anonymous"
                                    type="checkbox"
                                    checked={form.isAnonymous}
                                    onChange={handleAnonymousChange}
                                    className="w-4 h-4 text-blue-500 bg-dark rounded cursor-pointer"
                                />
                                <label
                                    htmlFor="checkbox-anonymous"
                                    className="ms-2 text-sm md:text-base font-normal text-light cursor-pointer select-none"
                                >
                                    send as Anonymous
                                </label>
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="mb-2">
                            <textarea
                                id="input-comment"
                                rows={2}
                                value={form.content}
                                onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="comment/request"
                                className="resize-none px-3 py-1.5 bg-light text-dark text-base rounded w-full focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Button */}
                        <div className="w-full">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-light text-sm md:text-base text-medium rounded hover:bg-blue-600 focus:outline-none select-none"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container mx-auto mt-8 pt-4 text-center text-light text-sm">
                © {currentYear} TransLyrics. Developed by Kayoi.
            </div>
        </footer>
    );
}