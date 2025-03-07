import React from 'react';
import { Guitar } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            About Music Buddy
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to mastering the guitar starts here
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80"
              alt="Guitar learning"
              className="w-full h-64 sm:h-72 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex items-center justify-center mb-6">
              <Guitar className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Guitar Learning Made Easy</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-center max-w-3xl mx-auto">
                Music Buddy is designed with beginners in mind, making guitar learning accessible and enjoyable.
                Our platform focuses on teaching you the most essential guitar chords found in popular songs.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
                {['Em', 'Am', 'C', 'D', 'G', 'A', 'E', 'F', 'Bm', 'B', 'Dm', 'Fm'].map((chord) => (
                  <div key={chord} className="bg-blue-50 rounded-lg p-3 text-center transform hover:scale-105 transition-transform">
                    <span className="text-blue-700 font-semibold">{chord}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 text-center mt-6 max-w-3xl mx-auto">
                Each chord is presented in a clear, step-by-step format, making it easy to understand
                and practice. Our interactive learning system ensures you master each chord before
                moving on to the next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;