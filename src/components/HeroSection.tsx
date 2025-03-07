import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const handleDiscoverClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80"
          alt="Guitar background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Learn Guitar with
            <span className="block text-yellow-400 mt-2">Music Buddy</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            "Your AI-powered guitar companion – listen, play accurately, and chat for real-time guidance on your musical journey."
          </p>
          
          <div className="mt-12">
            <a
              href="#about"
              onClick={handleDiscoverClick}
              className="inline-flex items-center text-white hover:text-yellow-400 transition group"
            >
              <span className="text-lg">Discover More</span>
              <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-500 ease-in-out group-hover:translate-y-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;