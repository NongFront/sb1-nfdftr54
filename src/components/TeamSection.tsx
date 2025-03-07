import React from 'react';
import { Users, LogIn } from 'lucide-react';

const TeamSection = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const team = [
    { name: 'Waratep Pormchat', id: '1640900104' },
    { name: 'Anuchit Lenpok', id: '1640900112' },
    { name: 'Pactcharin Sae-pung', id: '1640900237' },
    { name: 'Thanathat Aimsa-ard', id: '1640902290' },
    { name: 'Thawanrat Udomkiitpanya', id: '1640902456' },
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-gray-600">
            Bachelor of Engineering in Computer and Robotics Engineering, Class of 2024
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">Student ID: {member.id}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Project Advisor: Mr. Todsapon Banklongsi</p>
          <button
            onClick={onLoginClick}
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition transform hover:scale-105"
          >
            Login to Get Started <LogIn className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;