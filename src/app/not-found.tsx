export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-8">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-200">
                    <svg className="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
            </div>

            {/* Status Code */}
            <h1 className="text-3xl font-bold text-dark mb-4">404 - Page Not Found</h1>

            {/* Message */}
            <p className="text-lg text-dark mb-4">The page you're looking for doesn't exist or has been moved.</p>

            {/* Return Home Button */}
            <a 
                href="/" 
                className="bg-blue-500 hover:bg-blue-600 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap"
            >
                Return Home
            </a>
        </div>
    );
}