import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiCalendar, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

export default function ActivityFeed({ isDarkMode = false }) {
    const [expandedItem, setExpandedItem] = useState(null);
    
    const activities = [
        {
            job: "Software Engineer - ABC Corp",
            status: "Submitted",
            statusColor: "bg-green-100 text-green-800",
            icon: <FiCheckCircle className="text-green-500" />,
            date: "2023-10-15",
            description: "Your application has been successfully submitted. The hiring team will review it soon.",
            location: "New York, NY",
            type: "Full-time"
        },
        {
            job: "Data Analyst - XYZ Inc",
            status: "Under Review",
            statusColor: "bg-yellow-100 text-yellow-800",
            icon: <FiClock className="text-yellow-500" />,
            date: "2023-10-10",
            description: "Your application is currently being reviewed by the hiring team.",
            location: "Remote",
            type: "Contract"
        },
        {
            job: "UX Designer - Tech Solutions",
            status: "Interview",
            statusColor: "bg-blue-100 text-blue-800",
            icon: <FiCalendar className="text-blue-500" />,
            date: "2023-10-05",
            description: "Congratulations! You've been selected for an interview. Check your email for details.",
            location: "San Francisco, CA",
            type: "Full-time"
        },
    ];

    const toggleExpand = (index) => {
        if (expandedItem === index) {
            setExpandedItem(null);
        } else {
            setExpandedItem(index);
        }
    };

    return (
        <section className={`p-6 mt-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg`}>
            <h2 className={`mb-7 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Recent Applications & Activity Feed
            </h2>
            
            <div className="flex flex-col gap-4">
                {activities.map((activity, index) => (
                    <div 
                        key={index} 
                        className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden`}
                    >
                        <div 
                            className={`flex justify-between items-center p-4 cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="flex items-center">
                                <div className="mr-3">
                                    {activity.icon}
                                </div>
                                <div>
                                    <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{activity.job}</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className={`text-xs px-2 py-1 rounded-full ${activity.statusColor} mr-3`}>
                                    {activity.status}
                                </span>
                                {expandedItem === index ? 
                                    <FiChevronUp className={isDarkMode ? 'text-white' : ''} /> : 
                                    <FiChevronDown className={isDarkMode ? 'text-white' : ''} />}
                            </div>
                        </div>
                        
                        {expandedItem === index && (
                            <div className={`p-4 ${isDarkMode ? 'bg-gray-700 border-t border-gray-600' : 'bg-gray-50 border-t border-gray-200'}`}>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{activity.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`text-xs ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}>
                                        {activity.location}
                                    </span>
                                    <span className={`text-xs ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}>
                                        {activity.type}
                                    </span>
                                </div>
                                <div className="mt-3 flex justify-end">
                                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
