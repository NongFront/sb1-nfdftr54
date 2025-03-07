import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

interface NavBarProps {
  onLoginClick: () => void;
  showLogin: boolean;
}

const NavBar = ({ onLoginClick, showLogin }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent">
              Music Buddy
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-700 hover:text-blue-600 transition">About</a>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-gray-700 hover:text-blue-600 transition">Features</a>
            <a href="#team" onClick={(e) => handleNavClick(e, 'team')} className="text-gray-700 hover:text-blue-600 transition">Team</a>
            <button
              onClick={onLoginClick}
              className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login <LogIn className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition">About</a>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition">Features</a>
            <a href="#team" onClick={(e) => handleNavClick(e, 'team')} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition">Team</a>
            <button
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;