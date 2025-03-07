import React from 'react';
import { Brain, MessageSquare, Music } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            AI-Powered Features
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced technology meets musical learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
                alt="AI Chatbot"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-yellow-600 mr-3" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Botpress</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Powered by Botpress, our AI chatbot provides:
                </p>
                <ul className="list-none space-y-2 text-center">
                  <li className="text-gray-600">24/7 instant guidance and support</li>
                  <li className="text-gray-600">Personalized learning recommendations</li>
                  <li className="text-gray-600">Quick answers to common guitar questions</li>
                  <li className="text-gray-600">Interactive learning conversations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80"
                alt="Sound Recognition"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center mb-6">
                <Music className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Teachable</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Using Teachable Machine technology, our system features:
                </p>
                <ul className="list-none space-y-2 text-center">
                  <li className="text-gray-600">80-90% chord detection accuracy</li>
                  <li className="text-gray-600">100 sound samples per chord</li>
                  <li className="text-gray-600">50 epochs per model training</li>
                  <li className="text-gray-600">Real-time feedback on your playing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;