import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, logoutHandler }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a nav item is clicked
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center relative">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-white text-2xl font-bold hover:text-indigo-100 transition-colors"
          >
            Blog Platform
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-2 items-center">
            {renderNavItems(user, isActive, logoutHandler, handleNavItemClick)}
          </nav>

          {/* Navigation - Mobile */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 md:hidden z-50">
              <div className="flex flex-col space-y-2 p-4">
                {renderNavItems(user, isActive, logoutHandler, handleNavItemClick)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Separate function to render nav items to avoid code duplication
const renderNavItems = (user, isActive, logoutHandler, handleNavItemClick) => {
  return (
    <>
      <Link
        to="/"
        onClick={handleNavItemClick}
        className={`w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
          isActive('/') 
            ? 'bg-white text-indigo-700 shadow-sm' 
            : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
        }`}
      >
        Home
      </Link>
      
      {user ? (
        <>
          <Link
            to="/create-post"
            onClick={handleNavItemClick}
            className={`w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
              isActive('/create-post') 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
            }`}
          >
            Create Post
          </Link>
          
          <Link
            to="/my-posts"
            onClick={handleNavItemClick}
            className={`w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
              isActive('/my-posts') 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
            }`}
          >
            My Posts
          </Link>
          
          <Link
            to="/profile"
            onClick={handleNavItemClick}
            className={`w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
              isActive('/profile') 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
            }`}
          >
            Profile
          </Link>
          
          <button
            onClick={() => {
              logoutHandler();
              handleNavItemClick();
            }}
            className="w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={handleNavItemClick}
            className={`w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
              isActive('/login') 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
            }`}
          >
            Login
          </Link>
          
          <Link
            to="/register"
            onClick={handleNavItemClick}
            className="w-full md:w-auto px-3 py-2 rounded-lg text-sm md:text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default Header;