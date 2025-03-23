import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, logoutHandler }) => {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-indigo-100 transition-colors">
            Blog Platform
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-1 md:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
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
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                    isActive('/create-post') 
                      ? 'bg-white text-indigo-700 shadow-sm' 
                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
                  }`}
                >
                  Create Post
                </Link>
                
                <Link
                  to="/my-posts"
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                    isActive('/my-posts') 
                      ? 'bg-white text-indigo-700 shadow-sm' 
                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
                  }`}
                >
                  My Posts
                </Link>
                
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                    isActive('/profile') 
                      ? 'bg-white text-indigo-700 shadow-sm' 
                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
                  }`}
                >
                  Profile
                </Link>
                
                <button
                  onClick={logoutHandler}
                  className="px-3 py-2 rounded-lg text-sm md:text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                    isActive('/login') 
                      ? 'bg-white text-indigo-700 shadow-sm' 
                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-50'
                  }`}
                >
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-lg text-sm md:text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;