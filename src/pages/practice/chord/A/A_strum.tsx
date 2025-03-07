import React from 'react';
import Layout from '../../../Layout';

const A_strum = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">A Chord Strumming</h1>
          <p className="text-gray-600">Practice strumming patterns with the A chord</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Content will be added here */}
          <p className="text-center text-gray-600">Strumming patterns for A will be added here</p>
        </div>
      </div>
    </Layout>
  );
};

export default A_strum;