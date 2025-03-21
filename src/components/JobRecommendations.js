import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JobRecommendations({ isDarkMode }) {
    // Job data state remains the same
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: "Frontend Developer",
            company: "Tech Solutions Inc.",
            location: "New York, NY",
            salary: "$80,000 - $110,000",
            postedDate: "2 days ago",
            description: "We're looking for a skilled Frontend Developer to join our team. Experience with React and modern CSS frameworks required.",
            skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript"],
            isBookmarked: false,
            expanded: false,
            category: "Development",
        },
        // Other job entries remain the same
        {
            id: 2,
            title: "UX Designer",
            company: "Creative Designs",
            location: "Remote",
            salary: "$70,000 - $90,000",
            postedDate: "1 week ago",
            description: "Creative Designs is seeking a talented UX Designer to create beautiful, intuitive interfaces for our clients.",
            skills: ["Figma", "UI/UX", "User Research", "Prototyping"],
            isBookmarked: false,
            expanded: false,
            category: "Design",
        },
        {
            id: 3,
            title: "Full Stack Engineer",
            company: "Growth Startup",
            location: "San Francisco, CA",
            salary: "$100,000 - $130,000",
            postedDate: "Just now",
            description: "Join our fast-paced startup to build scalable applications from front to back.",
            skills: ["React", "Node.js", "MongoDB", "AWS"],
            isBookmarked: false,
            expanded: false,
            category: "Development",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    // Filtering logic remains the same
    useEffect(() => {
        const results = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredJobs(results);
    }, [searchTerm, selectedCategory, jobs]);

    const toggleBookmark = (id) => {
        setJobs(
            jobs.map((job) =>
                job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
            )
        );
    };

    const toggleExpand = (id) => {
        setJobs(
            jobs.map((job) =>
                job.id === id ? { ...job, expanded: !job.expanded } : job
            )
        );
    };

    const categories = ["All", "Development", "Design", "Marketing", "Management"];

    return (
        <section className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`mb-4 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Job Recommendations</h2>
            
            {/* Search and filter */}
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Search jobs or companies..."
                    className={`p-2 border rounded-lg flex-grow ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border-gray-300 text-black'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className={`p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {filteredJobs.length === 0 ? (
                <p className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No jobs match your search criteria</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredJobs.map((job) => (
                        <motion.div 
                            key={job.id} 
                            className={`border rounded-lg p-3 transition ${
                                isDarkMode 
                                    ? 'border-gray-700 bg-gray-700 hover:shadow-lg hover:shadow-gray-900/30' 
                                    : 'border-gray-200 hover:shadow-md'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{job.title}</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.company} • {job.location}</p>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.salary} • {job.postedDate}</p>
                                </div>
                                <motion.button 
                                    onClick={() => toggleBookmark(job.id)}
                                    className={job.isBookmarked ? "text-yellow-500" : (isDarkMode ? "text-gray-400" : "text-gray-400")}
                                    whileTap={{ scale: 1.2 }}
                                >
                                    {job.isBookmarked ? "★" : "☆"}
                                </motion.button>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-1">
                                {job.skills.map(skill => (
                                    <span key={skill} className={`px-2 py-1 text-xs rounded-full ${
                                        isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            
                            {job.expanded && (
                                <div className={`mt-3 text-sm border-t pt-2 ${
                                    isDarkMode ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-200'
                                }`}>
                                    <p>{job.description}</p>
                                </div>
                            )}
                            
                            <div className="mt-3 flex justify-between">
                                <button 
                                    onClick={() => toggleExpand(job.id)}
                                    className="text-blue-500 text-sm hover:underline"
                                >
                                    {job.expanded ? "View Less" : "View More"}
                                </button>
                                <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            
            <p className={`text-sm text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
        </section>
    );
}
