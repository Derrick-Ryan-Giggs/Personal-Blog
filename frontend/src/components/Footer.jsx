import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-3">Blog Platform</h3>
            <p className="text-indigo-200 text-sm">
              Share your thoughts, discover new ideas, and connect with others through writing.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-post" className="text-indigo-200 hover:text-white transition-colors">
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/my-posts" className="text-indigo-200 hover:text-white transition-colors">
                  My Posts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social media & contact */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {/* Social icons - you can replace these with actual icons */}
              <a href="#" className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="text-sm">T</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-sm">F</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-sm">I</span>
              </a>
            </div>
            <p className="text-sm text-indigo-200">
              Contact: support@blogplatform.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-indigo-700 mt-6 pt-6 text-center">
          <p className="text-indigo-200">&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;