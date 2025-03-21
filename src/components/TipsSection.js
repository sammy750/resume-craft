import React, { useState, useEffect } from "react";
// Import icons if using a library like react-icons
import { FaRegLightbulb, FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

export default function TipsSection({ isDarkMode }) {
    const tips = [
        {
            category: "Resume",
            text: "Keep your resume to one page for early career positions.",
            explanation: "Recruiters spend an average of 6-7 seconds scanning resumes, so brevity matters.",
            icon: "📄"
        },
        // ... other tips remain unchanged
    ];

    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [isPaused, tips.length]);

    const nextTip = () => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    };

    const prevTip = () => {
        setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
    };

    return (
        <section className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg`}>
            <h2 className={`mb-4 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'} flex items-center`}>
                <FaRegLightbulb className="mr-2 text-yellow-500" />
                Tips & Best Practices
            </h2>
            <div className={`min-h-[150px] p-4 text-base ${isDarkMode ? 'text-gray-200 bg-gray-700' : 'text-black bg-gray-100'} rounded-lg transition-all duration-300`}>
                <div className="flex items-start">
                    <span className="text-2xl mr-3">{tips[currentTipIndex].icon}</span>
                    <div>
                        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-white bg-blue-500 rounded">
                            {tips[currentTipIndex].category}
                        </span>
                        <p className="font-medium">{tips[currentTipIndex].text}</p>
                        <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tips[currentTipIndex].explanation}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-3">
                <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className={`flex items-center text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                    {isPaused ? <><FaPlay className="mr-1" /> Auto-rotate</> : <><FaPause className="mr-1" /> Pause</>}
                </button>
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={prevTip}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <FaChevronLeft />
                    </button>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currentTipIndex + 1}/{tips.length}
                    </span>
                    <button 
                        onClick={nextTip}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
