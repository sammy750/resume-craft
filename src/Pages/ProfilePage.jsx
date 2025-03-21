import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaCamera, FaMoon, FaSun, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = ({isDarkMode}) => {
    // Initialize profile with default values or load from localStorage
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : {
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Software Developer with 5 years of experience',
            skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
            profilePicture: 'https://via.placeholder.com/150',
        };
    });

    // Dark mode state
    // const [isDarkMode, setIsDarkMode] = useState(() => {
    //     const savedMode = localStorage.getItem('darkMode');
    //     return savedMode ? JSON.parse(savedMode) : false;
    // });

    // Save profile to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }, [profile]);

    // Save dark mode preference
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({...profile});
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newSkill, setNewSkill] = useState('');

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            setProfile(editedProfile);
            showNotification('Profile updated successfully!', 'success');
        } else {
            // Enter edit mode
            setEditedProfile({...profile});
        }
        setIsEditing(!isEditing);
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedProfile(prev => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() !== '' && !editedProfile.skills.includes(newSkill.trim())) {
            setEditedProfile(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setEditedProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // const toggleDarkMode = () => {
    //     setIsDarkMode(prev => !prev);
    // };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="container mx-auto px-4 py-8">
                <AnimatePresence>
                    {notification.show && (
                        <motion.div 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className={`mb-4 p-4 rounded shadow-lg ${notification.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}
                        >
                            {notification.message}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className={`rounded-lg shadow-md mb-6 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="p-6">
                        {/* <div className="flex justify-end mb-4">
                            <button 
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'} transition-all duration-300 hover:scale-110`}
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </div> */}
                        
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 text-center mb-4 md:mb-0">
                                <motion.div 
                                    className="relative inline-block"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img 
                                        src={profile.profilePicture} 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                    />
                                    {isEditing && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                            <label htmlFor="profilePicture" className="text-white cursor-pointer hover:text-gray-200">
                                                <FaCamera className="text-2xl" />
                                                <input 
                                                    type="file" 
                                                    id="profilePicture" 
                                                    onChange={handleImageChange} 
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                            <div className="md:w-3/4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">{isEditing ? 'Edit Profile' : 'Profile'}</h2>
                                    <motion.button 
                                        className={`flex items-center px-4 py-2 rounded ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                        onClick={handleEditToggle}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isEditing 
                                            ? <><FaSave className="mr-2" /> Save</> 
                                            : <><FaEdit className="mr-2" /> Edit</>}
                                    </motion.button>
                                </div>
                                
                                {isEditing ? (
                                    <form>
                                        <div className="mb-4">
                                            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={editedProfile.name}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={editedProfile.email}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
                                            <textarea 
                                                rows={3} 
                                                name="bio" 
                                                value={editedProfile.bio}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skills</label>
                                            <div className="flex flex-wrap mb-2">
                                                {editedProfile.skills.map((skill, index) => (
                                                    <motion.div 
                                                        key={index} 
                                                        className={`flex items-center m-1 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                    >
                                                        <span className="mr-1">{skill}</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(skill)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FaTimes size={12} />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="flex">
                                                <input 
                                                    type="text" 
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    placeholder="Add a skill..."
                                                    className={`flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                                />
                                                <motion.button 
                                                    type="button"
                                                    onClick={handleAddSkill}
                                                    className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FaPlus />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p className="mb-2"><span className="font-bold">Name:</span> {profile.name}</p>
                                        <p className="mb-2"><span className="font-bold">Email:</span> {profile.email}</p>
                                        <p className="mb-2"><span className="font-bold">Bio:</span> {profile.bio}</p>
                                        <div>
                                            <p className="font-bold mb-1">Skills:</p>
                                            <div className="flex flex-wrap">
                                                {profile.skills.map((skill, index) => (
                                                    <motion.span 
                                                        key={index} 
                                                        className={`px-2 py-1 rounded mr-2 mb-2 text-sm ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={`rounded-lg shadow-md overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`px-6 py-4 border-b ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <h3 className="text-xl font-bold">Account Settings</h3>
                    </div>
                    <div className="p-6">
                        <motion.button 
                            className={`w-full mb-2 px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Change Password
                        </motion.button>
                        <motion.button 
                            className={`w-full mb-2 px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Privacy Settings
                        </motion.button>
                        <motion.button 
                            className={`w-full mb-2 px-4 py-2 border rounded ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Notification Preferences
                        </motion.button>
                        <hr className={`my-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                        <motion.button 
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            onClick={() => setShowDeleteConfirm(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTrash className="inline mr-2" /> Delete Account
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-md mx-auto`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <h3 className="text-xl font-bold mb-4">Delete Account</h3>
                        <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-2">
                            <motion.button 
                                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                                onClick={() => setShowDeleteConfirm(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancel
                            </motion.button>
                            <motion.button 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    showNotification('Account scheduled for deletion', 'success');
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Yes, Delete
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;