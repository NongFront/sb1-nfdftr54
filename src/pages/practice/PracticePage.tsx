import React, { useState } from 'react';
import Layout from '../Layout';
import { Guitar, Music2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PracticePage = () => {
  const navigate = useNavigate();
  const [selectedChords, setSelectedChords] = useState<{
    [key: string]: string[];
  }>({});

  const lessons = [
    {
      id: 1,
      title: 'First Steps in Guitar',
      description: 'Start your journey with three essential chords',
      chords: ['Em', 'Am', 'C'],
      image:
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80',
      link: '/practice/lesson1',
    },
    {
      id: 2,
      title: 'Expanding Your Chord Vocabulary',
      description: 'Add three more chords to your repertoire',
      chords: ['D', 'G', 'A'],
      image:
        'https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80',
      link: '/practice/lesson2',
    },
    {
      id: 3,
      title: 'Melodic Progressions',
      description: 'Learn new chords for richer harmonies',
      chords: ['E', 'F', 'Bm'],
      image:
        'https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&q=80',
      link: '/practice/lesson3',
    },
    {
      id: 4,
      title: 'Harmonic Combinations',
      description: 'Master more chords for diverse song styles',
      chords: ['B', 'Dm', 'Fm'],
      image:
        'https://images.unsplash.com/photo-1605020420620-20c943cc4669?auto=format&fit=crop&q=80',
      link: '/practice/lesson4',
    },
  ];

  const handleChordSelect = (lessonId: number, chord: string) => {
    setSelectedChords((prev) => {
      const lessonKey = `lesson${lessonId}`;
      return {
        ...prev,
        [lessonKey]: [chord],
      };
    });
  };

  const startPractice = (lessonId: number, type: 'finger' | 'strumming', chord: string) => {
    navigate(`/practice/chord/${chord}/${type}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Practice Sessions
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Select a chord to practice, or practice the entire lesson. Each
            session includes chord fingering and strumming exercises.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm font-semibold text-gray-900">
                    Lesson {lesson.id}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {lesson.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {lesson.chords.map((chord) => (
                    <button
                      key={chord}
                      onClick={() => handleChordSelect(lesson.id, chord)}
                      className={`py-2 rounded-lg text-base font-medium transition-all ${
                        selectedChords[`lesson${lesson.id}`]?.includes(chord)
                          ? 'bg-blue-600 text-white scale-105 shadow-md'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {chord}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const selectedChord = selectedChords[`lesson${lesson.id}`]?.[0];
                      if (selectedChord) {
                        startPractice(lesson.id, 'finger', selectedChord);
                      } else {
                        startPractice(lesson.id, 'finger', lesson.chords[0]);
                      }
                    }}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Guitar className="h-4 w-4" />
                    <span className="font-medium">Chord Finger</span>
                  </button>
                  <button
                    onClick={() => {
                      const selectedChord = selectedChords[`lesson${lesson.id}`]?.[0];
                      if (selectedChord) {
                        startPractice(lesson.id, 'strumming', selectedChord);
                      } else {
                        startPractice(lesson.id, 'strumming', lesson.chords[0]);
                      }
                    }}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Music2 className="h-4 w-4" />
                    <span className="font-medium">Chord Strumming</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;