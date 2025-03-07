import React, { useState } from 'react';
import Layout from "../../../Layout";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestEm = () => {
  const [currentStep, setCurrentStep] = useState(3); 
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Intro", link: "/IntroEm" },
    { id: 2, name: "Lesson", link: "/LessonEm" },
    { id: 3, name: "Test", link: "/TestEm" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
              {/* Header + Dropdown */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate("/Course1")} className="text-blue-600 font-semibold">
                  &lt; Back
                </button>
      
                {/* Dropdown */}
                <div className="relative z-50">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    {steps[currentStep - 1].name} <ChevronDown />
                  </button>
      
                  {isOpen && (
                    <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                      {steps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => {
                            setCurrentStep(step.id);
                            navigate(step.link);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 ${
                            step.id === currentStep ? "font-bold" : ""
                          }`}
                        >
                          {step.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
      
              {/* Progress Bar */}
              <div className="relative mb-8">
              {/* เส้นสีเทา (พื้นหลัง) */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
      
              {/* เส้นสีฟ้า (ความคืบหน้า) */}
              <div
                  className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }} 
              ></div>
      
              {/* จุดแต่ละขั้นตอน */}
              <div className="flex justify-between relative z-10">
                  {steps.map((step) => (
                  <div key={step.id} className="relative flex flex-col items-center">
                      <div
                      className={`absolute top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full font-semibold border-4 ${
                          step.id <= currentStep
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                      >
                      {step.id}
                      </div>
                  </div>
                  ))}
              </div>
              </div>

        
      </div>
    </Layout>
  );
};

export default TestEm;
