import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isDarkMode }) => {
    return (
        <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-gray-50 to-gray-100'} ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-t`}>
            <div className="max-w-7xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>ResumeCraft</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Create professional resumes in minutes with our easy-to-use tools.</p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'} transition-colors duration-200`}>
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-900'} transition-colors duration-200`}>
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-700'} transition-colors duration-200`}>
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Home</Link></li>
                            <li><Link to="/templates" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Templates</Link></li>
                            <li><Link to="/pricing" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Pricing</Link></li>
                            <li><Link to="/blog" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Blog</Link></li>
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div className="col-span-1">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>FAQ</Link></li>
                            <li><Link to="/help" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Help Center</Link></li>
                            <li><Link to="/contact" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Contact Us</Link></li>
                            <li><Link to="/feedback" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200`}>Feedback</Link></li>
                        </ul>
                    </div>
                    
                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Stay Updated</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Subscribe to our newsletter</p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className={`px-4 py-2 w-full sm:w-auto rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                required
                            />
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Divider */}
                <div className={`${isDarkMode ? 'border-gray-800' : 'border-gray-200'} border-t my-8`}></div>
                
                {/* Bottom links and copyright */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
                        <Link to="/privacy" className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>Privacy Policy</Link>
                        <Link to="/terms" className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>Terms of Service</Link>
                        <Link to="/cookies" className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>Cookie Policy</Link>
                        <Link to="/sitemap" className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>Sitemap</Link>
                    </div>
                    <div>
                        <p className={`text-center md:text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>&copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.</p>
                    </div>
                </div>
            </div>
            
            {/* Back to top button */}
            <div className="text-center pb-4">
                <button 
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className={`inline-flex items-center text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-200`}
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    Back to top
                </button>
            </div>
        </footer>
    );
};

export default Footer;
