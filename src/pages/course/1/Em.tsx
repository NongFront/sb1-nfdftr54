import React, { useState } from "react";
import Layout from "../../Layout";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Course1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อนำทาง

  const lessons = [
    { id: 1, name: "Intro", link: "/IntroEm", locked: false },
    { id: 2, name: "Lesson", link: "/LessonEm", locked: false },
    { id: 3, name: "Test", link: "/TestEm", locked: false },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button + Dropdown */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate("/Course1")} 
            className="text-blue-600 font-semibold"
          >
            &lt; Back
          </button>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Select Lesson <ChevronDown />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      if (!lesson.locked) navigate(lesson.link);
                    }}
                    className={`w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 flex justify-between ${
                      lesson.locked ? "text-gray-400 cursor-not-allowed" : ""
                    }`}
                    disabled={lesson.locked}
                  >
                    {lesson.name} {lesson.locked && "🔒"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lesson Content Placeholder */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold">Select a lesson to start</h2>
          <p className="text-gray-600 mt-2">Click the dropdown above to choose.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Course1;
