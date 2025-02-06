"use client"; // Ini memastikan komponen ini menjadi Client Component

type AlphabetNavigationProps = {
    alphabet: string[];
};

export default function AlphabetNavigation({ alphabet }: AlphabetNavigationProps) {
    const scrollToSection = (letter: string) => {
        const element = document.getElementById(`section-${letter}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-wrap gap-2 py-4 mb-4">
            {["#", ...alphabet].map((letter) => (
                <button
                    key={letter}
                    onClick={() => scrollToSection(letter)}
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
