import React from 'react';
import Layout from '../Layout';
import { Guitar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const HistoryPage = () => {
  const navigate = useNavigate();
  
  const pages = [
    { id: 1, title: "First Steps in Guitar", chords: ["Em", "Am", "C"], link: "/Course1", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80", locked: false },
    { id: 2, title: "Expanding Your Chord Vocabulary", chords: ["D", "G", "A"], link: "/Course2", image: "https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80", locked: false },
    { id: 3, title: "Melodic Progressions", chords: ["E", "F", "Bm"], link: "/Course3", image: "https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&q=80", locked: false },
    { id: 4, title: "Harmonic Combinations", chords: ["B", "Dm", "Fm"], link: "/Course4", image: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?auto=format&fit=crop&q=80", locked: false },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Course Sessions</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Select a course to practice chords and improve your skills.
          </p>
        </div>

        <div className="mt-8 w-full">
          <Slider {...settings} className="w-full">
            {pages.map((page) => (
              <div key={page.id} className="w-full">
                <div className={`group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg  transition-all duration-300 transform hover:-translate-y-1 ${page.locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="relative h-96">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Course {page.id}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {page.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      Chords: {page.chords.join(", ")}
                    </p>

                    <button
                      onClick={() => !page.locked && navigate(page.link)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 w-full text-white rounded-lg transition-colors text-lg font-semibold ${page.locked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                      disabled={page.locked}
                    >
                      <Guitar className="h-5 w-5" />
                      Start Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
