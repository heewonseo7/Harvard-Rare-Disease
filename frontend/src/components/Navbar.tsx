import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18">
                    <div className="flex items-center">
                        <h1 className="text-[#0033a1] text-xl font-bold">PhysioTherapy</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex space-x-6">
                            <Link to="/" className="text-[#0033a1] hover:text-[#3b83f6] px-3 py-2 rounded-md text-md transition duration-300 ease-in-out transform hover:scale-105">
                                Home
                            </Link>
                            <Link to="/exercises" className="text-[#0033a1] hover:text-[#3b83f6] px-3 py-2 rounded-md text-md transition duration-300 ease-in-out transform hover:scale-105">
                                Exercises
                            </Link>
                            <Link to="/profile" className="text-[#0033a1] hover:text-[#3b83f6] px-3 py-2 rounded-md text-md transition duration-300 ease-in-out transform hover:scale-105">
                                Profile
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-[#0033a1] focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white p-4 rounded-lg">
                    <Link to="/" className="text-[#0033a1] block px-3 py-2 rounded-md text-lg font-medium hover:text-[#3b83f6] transition duration-300 ease-in-out transform hover:scale-105">
                        Home
                    </Link>
                    <Link to="/exercises" className="text-[#0033a1] block px-3 py-2 rounded-md text-lg font-medium hover:text-[#3b83f6] transition duration-300 ease-in-out transform hover:scale-105">
                        Exercises
                    </Link>
                    <Link to="/profile" className="text-[#0033a1] block px-3 py-2 rounded-md text-lg font-medium hover:text-[#3b83f6] transition duration-300 ease-in-out transform hover:scale-105">
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
