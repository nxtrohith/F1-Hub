'use client';
export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            {/* F1-themed Racing Spinner */}
            <div className="relative">
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-full border-4 border-gray-700 border-t-red-500 animate-spin"></div>
                
                {/* Inner ring - counter rotation effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-gray-600 border-b-red-400 animate-spin-reverse"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Loading text with racing effect */}
            <div className="mt-8 flex items-center gap-1">
                <span className="text-white text-lg font-medium tracking-wider">Loading</span>
                <span className="flex gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                </span>
            </div>
            
            {/* Racing stripe accent */}
            <div className="mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-600 to-red-400 rounded-full animate-loading-bar"></div>
            </div>

            <style jsx>{`
                @keyframes spin-reverse {
                    from {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                }
                .animate-spin-reverse {
                    animation: spin-reverse 0.8s linear infinite;
                }
                @keyframes loading-bar {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(300%);
                    }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
