'use client';
export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#4a4a4a]">
            {/* F1 Car SVG Loader */}
            <div className="relative animate-car-bounce">
                <svg 
                    width="280" 
                    height="100" 
                    viewBox="0 0 280 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                >
                    {/* Rear Wing */}
                    <rect x="10" y="20" width="8" height="35" fill="white" />
                    <rect x="6" y="15" width="16" height="8" fill="white" />
                    
                    {/* Engine Cover / Rear Body */}
                    <path d="M18 45 L18 55 L80 55 L80 35 L50 25 L18 25 Z" fill="white" />
                    
                    {/* Air Intake */}
                    <rect x="55" y="22" width="12" height="13" fill="#333" />
                    
                    {/* Cockpit */}
                    <path d="M80 35 L80 55 L120 55 L130 45 L130 35 L80 35 Z" fill="white" />
                    
                    {/* Driver Helmet */}
                    <ellipse cx="100" cy="38" rx="12" ry="10" fill="#dc2626" />
                    <ellipse cx="104" cy="36" rx="5" ry="4" fill="#1a1a1a" />
                    
                    {/* Nose Cone */}
                    <path d="M130 40 L130 55 L200 55 L200 50 L160 45 L130 40 Z" fill="white" />
                    <path d="M200 50 L200 55 L250 55 L250 52 L200 50 Z" fill="white" />
                    
                    {/* Front Wing */}
                    <rect x="245" y="50" width="30" height="6" fill="white" />
                    <rect x="250" y="56" width="25" height="4" fill="#ccc" />
                    
                    {/* Side Pod */}
                    <rect x="85" y="55" width="50" height="12" fill="#e5e5e5" />
                    <rect x="90" y="57" width="40" height="3" fill="#333" />
                    
                    {/* Floor */}
                    <rect x="30" y="67" width="180" height="4" fill="#1a1a1a" />
                    
                    {/* Rear Wheel */}
                    <g className="origin-center animate-wheel-spin" style={{ transformOrigin: '45px 71px' }}>
                        <circle cx="45" cy="71" r="18" fill="#1a1a1a" />
                        <circle cx="45" cy="71" r="15" fill="#333" />
                        <circle cx="45" cy="71" r="14" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="3" />
                        <circle cx="45" cy="71" r="6" fill="#e5e5e5" />
                        <circle cx="45" cy="71" r="3" fill="#666" />
                        {/* Wheel spokes */}
                        <line x1="45" y1="57" x2="45" y2="85" stroke="#444" strokeWidth="2" />
                        <line x1="31" y1="71" x2="59" y2="71" stroke="#444" strokeWidth="2" />
                        <line x1="35" y1="61" x2="55" y2="81" stroke="#444" strokeWidth="2" />
                        <line x1="55" y1="61" x2="35" y2="81" stroke="#444" strokeWidth="2" />
                    </g>
                    
                    {/* Front Wheel */}
                    <g className="origin-center animate-wheel-spin" style={{ transformOrigin: '200px 71px' }}>
                        <circle cx="200" cy="71" r="18" fill="#1a1a1a" />
                        <circle cx="200" cy="71" r="15" fill="#333" />
                        <circle cx="200" cy="71" r="14" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="3" />
                        <circle cx="200" cy="71" r="6" fill="#e5e5e5" />
                        <circle cx="200" cy="71" r="3" fill="#666" />
                        {/* Wheel spokes */}
                        <line x1="200" y1="57" x2="200" y2="85" stroke="#444" strokeWidth="2" />
                        <line x1="186" y1="71" x2="214" y2="71" stroke="#444" strokeWidth="2" />
                        <line x1="190" y1="61" x2="210" y2="81" stroke="#444" strokeWidth="2" />
                        <line x1="210" y1="61" x2="190" y2="81" stroke="#444" strokeWidth="2" />
                    </g>
                </svg>
            </div>
            
            {/* Loading text */}
            <div className="mt-8 flex items-center gap-2">
                <span className="text-white text-xl font-bold tracking-widest uppercase">Loading</span>
                <span className="flex gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                </span>
            </div>

            {/* Road/Track line */}
            <div className="mt-4 w-72 h-1 bg-gray-600 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 flex gap-4 animate-road">
                    <span className="w-8 h-full bg-white/30"></span>
                    <span className="w-8 h-full bg-white/30"></span>
                    <span className="w-8 h-full bg-white/30"></span>
                    <span className="w-8 h-full bg-white/30"></span>
                    <span className="w-8 h-full bg-white/30"></span>
                    <span className="w-8 h-full bg-white/30"></span>
                </div>
            </div>

            <style jsx>{`
                @keyframes wheel-spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-wheel-spin {
                    animation: wheel-spin 0.5s linear infinite;
                }
                @keyframes car-bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-3px);
                    }
                }
                .animate-car-bounce {
                    animation: car-bounce 0.3s ease-in-out infinite;
                }
                @keyframes road {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-48px);
                    }
                }
                .animate-road {
                    animation: road 0.4s linear infinite;
                }
            `}</style>
        </div>
    );
}
