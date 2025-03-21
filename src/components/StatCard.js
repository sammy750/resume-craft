import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function StatCard({
    title,
    type,
    score,
    actions,
    actionLink,
    missingSkills,
    questions,
    isDarkMode,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showModal, setShowModal] = useState(false);
    const tooltipTimeout = useRef(null);

    const handleTooltip = (content, e) => {
        clearTimeout(tooltipTimeout.current);
        setTooltipContent(content);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
        setShowTooltip(true);
    };

    const hideTooltip = () => {
        tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 200);
    };

    const renderContent = () => {
        switch (type) {
            case "resume":
                return (
                    <>
                        <div 
                            className="mb-[8px] relative overflow-hidden rounded-md cursor-pointer" 
                            onClick={() => setShowModal(true)}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    Preview Resume
                                </span>
                            </div>
                            <svg
                                width="100%"
                                height="125"
                                viewBox="0 0 188 125"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transition-transform duration-300"
                                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                            >
                                <rect width="188" height="125" fill={isDarkMode ? "#333333" : "#DDDDDD"} />
                            </svg>
                        </div>
                        <div className="flex gap-2">
                            {actions.map((action, index) => {
                                const colors = {
                                    View: "bg-primary-500 hover:bg-primary-600",
                                    Download: "bg-secondary-500 hover:bg-secondary-600",
                                    Edit: "bg-accent-500 hover:bg-accent-600",
                                };
                                return (
                                    <button
                                        key={index}
                                        className={`px-3 py-1.5 text-sm font-medium text-white ${colors[action]} rounded-md transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105 active:scale-95`}
                                        onClick={() => action === "View" && setShowModal(true)}
                                    >
                                        {action}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                );
            case "ats":
                return (
                    <>
                        <div 
                            className={`w-full h-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden relative`}
                            onMouseEnter={(e) => handleTooltip(`Your resume is ${score}% ATS compatible`, e)}
                            onMouseLeave={hideTooltip}
                        >
                            <div 
                                className="h-full bg-secondary-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${score}%` }}
                            />
                        </div>
                        <p className={`mt-3 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Latest ATS Score: <span className="text-secondary-500 font-bold">{score}%</span>
                            <button 
                                className="ml-2 text-xs text-primary-500 underline"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? "Hide details" : "Show details"}
                            </button>
                        </p>
                        {isExpanded && (
                            <div className={`mt-3 p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-md animate-fadeIn`}>
                                <h3 className="font-semibold mb-2">Improvement suggestions:</h3>
                                <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} list-disc pl-4`}>
                                    <li>Add more keywords related to the job description</li>
                                    <li>Use a more standard resume format</li>
                                    <li>Include measurable achievements</li>
                                </ul>
                            </div>
                        )}
                    </>
                );
            case "skills":
                return (
                    <div className="space-y-2">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Missing Skills: <span className="font-semibold text-primary-600">{missingSkills}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["React.js", "TypeScript", "AWS"].map((skill, index) => (
                                <span 
                                    key={index}
                                    className={`px-2 py-1 text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-primary-900 hover:text-primary-300' : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'} rounded-full cursor-pointer transition-colors duration-200`}
                                    onMouseEnter={(e) => handleTooltip(`Add ${skill} to your resume to improve matching`, e)}
                                    onMouseLeave={hideTooltip}
                                    onClick={() => alert(`Add ${skill} to your profile`)}
                                >
                                    {skill}
                                </span>
                            ))}
                            <button className={`px-2 py-1 text-xs ${isDarkMode ? 'bg-primary-900 text-primary-300 hover:bg-primary-800' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'} rounded-full transition-colors duration-200`}>
                                + Add more
                            </button>
                        </div>
                    </div>
                );
            case "interview":
                return (
                    <div className="space-y-2">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Generated Questions: <span className="font-semibold text-primary-600">{questions}</span>
                        </p>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Practice answering common interview questions based on your resume
                        </div>
                        <div className="pt-2">
                            <button 
                                className={`w-full py-2 mt-2 ${isDarkMode ? 'bg-primary-900 hover:bg-primary-800 text-primary-300' : 'bg-primary-50 hover:bg-primary-100 text-primary-600'} rounded transition-colors duration-200 text-sm font-medium`}
                                onClick={() => setShowModal(true)}
                            >
                                Start Practice Session
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Simple modal component
    const Modal = () => {
        if (!showModal) return null;
        
        return createPortal(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{title} Details</h3>
                        <button 
                            onClick={() => setShowModal(false)}
                            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="py-4">
                        {type === "resume" && <div className={`text-center p-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>Resume Preview Content</div>}
                        {type === "ats" && <div className="space-y-4">
                            <h4 className="font-semibold">Detailed ATS Analysis</h4>
                            <p>Your resume scores {score}% against ATS systems. Here's how to improve:</p>
                            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded`}>Detailed recommendations...</div>
                        </div>}
                        {type === "interview" && <div className="space-y-4">
                            <h4 className="font-semibold">Interview Practice</h4>
                            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded mb-3`}>
                                <p className="font-medium">Question 1: Tell me about yourself</p>
                                <textarea className={`w-full mt-2 p-2 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-600' : 'border-gray-300'} border rounded`} rows="3" placeholder="Type your answer..."></textarea>
                            </div>
                            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded`}>
                                <p className="font-medium">Question 2: What are your strengths?</p>
                                <textarea className={`w-full mt-2 p-2 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-600' : 'border-gray-300'} border rounded`} rows="3" placeholder="Type your answer..."></textarea>
                            </div>
                        </div>}
                    </div>
                    <div className="flex justify-end pt-4 border-t">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    // Tooltip component
    const Tooltip = () => {
        if (!showTooltip) return null;
        
        return createPortal(
            <div 
                className={`fixed ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white text-xs rounded py-1 px-2 z-50 animate-fadeIn`}
                style={{ 
                    left: tooltipPosition.x + 10, 
                    top: tooltipPosition.y + 10,
                    maxWidth: '200px'
                }}
            >
                {tooltipContent}
            </div>,
            document.body
        );
    };

    return (
        <>
            <article 
                className={`p-5 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-lg shadow-card transition-all duration-300 ${isHovered ? 'shadow-card-hover transform -translate-y-1' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h2 className={`mb-4 text-lg font-bold flex justify-between ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {title}
                    <button 
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </h2>
                {renderContent()}
                {actionLink && (
                    <button className="mt-4 text-sm text-primary-500 font-medium hover:text-primary-700 hover:underline transition-colors duration-200 flex items-center group">
                        {actionLink}
                        <svg className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                )}
            </article>
            <Modal />
            <Tooltip />
        </>
    );
}
