import React from 'react';
import Layout from '../Layout';

const Course1 = () => {
  const lessons = [
    { id: 1, name: "Em", link: "/IntroEm", locked: false },
    { id: 2, name: "Am", link: "/Am", locked: false },
    { id: 3, name: "C", link: "/C", locked: false },
  ];

  return (
    <Layout>
      <div className="p-6 flex flex-col gap-4">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => {
              if (!lesson.locked) window.location.href = lesson.link;
            }}
            className={`border-2 rounded-lg p-4 flex justify-between items-center text-xl font-semibold transition
              ${lesson.locked ? 'border-gray-400 bg-gray-200 text-gray-600 cursor-not-allowed' : 'border-blue-500 bg-white hover:bg-blue-100'}
            `}
            disabled={lesson.locked}
          >
            <span>{lesson.name}</span>
            {lesson.locked && <span>🔒</span>}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Course1;
