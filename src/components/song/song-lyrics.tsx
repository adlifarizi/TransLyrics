'use client';

import { useState, useMemo } from 'react';

// Types
type LyricType = 'original' | 'romanized' | 'translyrics';
type LanguageCode = 'ja' | 'en' | 'id';

interface Lyric {
    content: string;
    language: LanguageCode;
    type: LyricType;
}

interface GroupedLyrics {
    original?: string;
    romanized?: string;
    translations: Partial<Record<LanguageCode, string>>;
}

// Constants
const LANGUAGE_CODE: Record<LanguageCode, string> = {
    "ja": "Japan",
    "en": "English",
    "id": "Indonesia"
};

const TABS = ['Original', 'Romanized', 'Translyrics', 'Side by Side'] as const;
type TabType = typeof TABS[number];

// Component
export default function SongLyrics({ lyrics }: { lyrics: Lyric[] }) {
    const [activeTab, setActiveTab] = useState<TabType>('Original');
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');
    const [leftLyrics, setLeftLyrics] = useState<LyricType | LanguageCode>('original');
    const [rightLyrics, setRightLyrics] = useState<LyricType | LanguageCode>('romanized');

    const availableLanguages = useMemo(() => {
        const languages = lyrics
            .filter(lyric => lyric.type === 'translyrics')
            .map(lyric => lyric.language);

        return [...new Set(languages)].sort((a, b) => {
            const nameA = LANGUAGE_CODE[a].toLowerCase();
            const nameB = LANGUAGE_CODE[b].toLowerCase();
            return nameA.localeCompare(nameB);
        });
    }, [lyrics]);

    const groupedLyrics: GroupedLyrics = useMemo(() => {
        return lyrics.reduce((acc: GroupedLyrics, lyric) => {
            if (lyric.type === 'translyrics') {
                acc.translations[lyric.language] = lyric.content;
            } else {
                acc[lyric.type] = lyric.content;
            }
            return acc;
        }, { translations: {} });
    }, [lyrics]);

    const getLyrics = (type: TabType | LyricType | LanguageCode) => {
        switch (type) {
            case 'Original':
            case 'original':
                return groupedLyrics.original || "There are no lyrics available at this time";
            case 'Romanized':
            case 'romanized':
                return groupedLyrics.romanized || "There are no lyrics available at this time";
            case 'Translyrics':
                return groupedLyrics.translations[selectedLanguage as LanguageCode] || "There are no lyrics available at this time";
            default:
                return groupedLyrics.translations[type as LanguageCode] || "There are no lyrics available at this time";
        }
    };

    const leftLyricsLines = getLyrics(leftLyrics).split('\n');
    const rightLyricsLines = getLyrics(rightLyrics).split('\n');

    // Set initial selected language
    if (availableLanguages.length > 0 && !selectedLanguage) {
        setSelectedLanguage(availableLanguages[0]);
    }

    return (
        <section className="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

            <h2 className="text-xl lg:text-2xl font-medium text-dark truncate mb-2 select-none">
                Lyrics
            </h2>

            <div className="w-full">
                {/* Tabs Navigation */}
                <div className="flex relative justify-between">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 -mb-px w-full select-none ${activeTab === tab
                                ? 'border-b-4 border-blue-500 text-blue-500'
                                : 'border-b-2 border-gray-400 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dropdown Selector for Translyrics */}
                {activeTab === 'Translyrics' && (
                    <div className="mt-4">
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
                            className="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none"
                        >
                            {availableLanguages.map((language) => (
                                <option key={language} value={language}>
                                    {LANGUAGE_CODE[language]}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Side by Side Selectors */}
                {activeTab === 'Side by Side' && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <select
                            value={leftLyrics}
                            onChange={(e) => setLeftLyrics(e.target.value as LyricType | LanguageCode)}
                            className="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none"
                        >
                            <option value="original">Original</option>
                            <option value="romanized">Romanized</option>
                            {availableLanguages.map((language) => (
                                <option key={language} value={language}>
                                    {LANGUAGE_CODE[language]}
                                </option>
                            ))}
                        </select>
                        <select
                            value={rightLyrics}
                            onChange={(e) => setRightLyrics(e.target.value as LyricType | LanguageCode)}
                            className="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none"
                        >
                            <option value="original">Original</option>
                            <option value="romanized">Romanized</option>
                            {availableLanguages.map((language) => (
                                <option key={language} value={language}>
                                    {LANGUAGE_CODE[language]}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Lyrics Content */}
                <div className="mt-4">
                    {activeTab !== 'Side by Side' ? (
                        <div className="whitespace-pre-line">
                            {getLyrics(activeTab)}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {leftLyricsLines.map((leftLine, index) => (
                                <div key={index} className="flex items-start space-x-4 hover:underline">
                                    <div className="whitespace-pre-line w-full">{leftLine}</div>
                                    <div className="whitespace-pre-line w-full">
                                        {rightLyricsLines[index] || ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </section>

    );
}