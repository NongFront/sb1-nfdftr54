import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Layout";
import { ChevronDown, X, HelpCircle, Play } from "lucide-react";

const LessonEm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("Lesson");
  const [currentSound, setCurrentSound] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [noSound, setNoSound] = useState(false);


  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleSelectLesson = (lesson: string, path: string) => {
    setSelectedLesson(lesson);
    setIsOpen(false);
    navigate(path);
  };

  const steps = [
    { id: 1, name: "Intro", link: "/IntroEm" },
    { id: 2, name: "Lesson", link: "/LessonEm" },
    { id: 3, name: "Test", link: "/TestEm" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      navigate(steps[currentStep].link);
    }
  };

  const playSound = (soundNumber: number) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(`/sounds/Em_${soundNumber}.wav`);
    newAudio.play();
    setAudio(newAudio);
    setCurrentSound(soundNumber);
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      setIsMicActive(true);
      setNoSound(false);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsMicActive(false);
    }
  };

  const stopListening = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsMicActive(false);
    setNoSound(false);
  };

  useEffect(() => {
    return () => {
      // Clean up on unmount
      stopListening();
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button + Dropdown */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/IntroEm")} className="text-blue-600 font-semibold">
            &lt; Back
          </button>

          {/* Dropdown */}
          <div className="relative z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              {selectedLesson} <ChevronDown />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button onClick={() => handleSelectLesson("Intro", "/IntroEm")} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Intro</button>
                <button onClick={() => handleSelectLesson("Lesson", "/LessonEm")} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Lesson</button>
                <button onClick={() => handleSelectLesson("Test", "/TestEm")} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Test</button>
              </div>
            )}
          </div>
        </div>

        

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            
            <h1 className="text-3xl font-bold text-gray-900">Em Chord Fingering</h1>
            <button onClick={() => setShowTips(true)} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Help">
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </button>
          </div>

        </div>
        
        {/* Progress Bar */}
        <div className="relative mb-8">
            {/* เส้นสีเทา (พื้นหลัง) */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 rounded-full transform -translate-y-1/2"></div>

            {/* เส้นสีฟ้า (ความคืบหน้า) */}
            <div
            className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }} //เปลี่ยนความยาวตรงนี้
        >   </div>

        {/* จุดแต่ละขั้นตอน */}
        <div className="flex justify-between relative z-10">
            {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center">
                <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full font-semibold border-4 ${
                    step.id <= 2  // เปลี่ยน currentStep เป็น 2
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

        
        {/* Main Content */}
        <div className="flex gap-8 p-6 rounded-lg">
          {/* Image on the left */}
          <div className="w-1/3">
            <img src="https://images.unsplash.com/photo-1740559653501-aa337f59ab01?q=80&w=1780&auto=format&fit=crop" alt="Guitar chord reference" className="w-full h-[400px] object-cover rounded-xl" />
          </div>

          {/* Guitar neck visualization */}
          <div className="flex-1">
            <div className="flex justify-between px-4 ml-12 mb-1">
              {[1, 2, 3, 4, 5].map((number) => (
                <div key={number} className="text-sm font-medium text-gray-600 flex items-center justify-center" style={{ width: `${(100 - 12) / 5}%` }}>
                  {number}
                </div>
              ))}
            </div>

            <div className="relative w-full h-[400px] bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-200 to-gray-100 border-r-2 border-gray-400 flex flex-col justify-between py-4">
                {['E', 'A', 'D', 'G', 'B', 'e'].map((string) => (
                  <div key={string} className="relative h-[48px] flex items-center justify-center">
                    <span className="text-gray-800 font-medium">{string}</span>
                  </div>
                ))}
              </div>
              {/* Fret markers */}
              {[3, 5].map((fret) => (
                <div
                  key={fret}
                  className="absolute w-4 h-4 rounded-full bg-gray-400"
                  style={{
                    left: `${((fret - 0.5) * (100 - 12)) / 5 + 12}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
                {/* Strings */}
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="absolute left-12 right-0 h-[1px] bg-gray-600"
                  style={{
                    top: `${(index * 400) / 6 + 400 / 12}px`,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                />
              ))}
              {/* Fret lines */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute h-full w-[1px] bg-gray-400" style={{ left: `${((i + 1) * (100 - 12)) / 5 + 12}%` }} />
              ))}

              {/* Finger position indicators */}
              <div className="absolute w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `${((2 - 0.5) * (100 - 12)) / 5 + 12}%`, top: `${(1 * 400) / 6 + 400 / 12}px`, transform: 'translate(-50%, -50%)' }}
                onClick={() => playSound(1)}
              >
                1
              </div>

              <div
                className="absolute w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${((2 - 0.5) * (100 - 12)) / 5 + 12}%`,
                  top: `${(2 * 400) / 6 + 400 / 12}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => playSound(2)}
              >
                2
              </div>
            </div>
          </div>
              
          {/* String Sound controls - Vertical on the right */}
          <div className="w-32">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Strings</h3>
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <button
                  key={number}
                  onClick={() => playSound(number)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentSound === number ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <Play className="h-4 w-4" />
                  <span>{number}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* No sound warning */}
        {noSound && isMicActive && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-800 text-center">
            <p className="font-medium">No sound detected!</p>
            <p className="text-sm mt-1">Try playing your guitar</p>
          </div>
        )}

        {/* Tips Modal */}
        {showTips && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">How to Play Em Chord</h2>
                <button onClick={() => setShowTips(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Finger Placement</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Place your first finger on the 5th string (A string), 2nd fret</li>
                    <li>Place your second finger on the 4th string (D string), 2nd fret</li>
                    <li>Keep other strings open</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Common Mistakes</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Fingers too far from the fret</li>
                    <li>Accidentally muting adjacent strings</li>
                    <li>Strumming muted strings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ปุ่ม Next */}
      <div className="mt-6 flex justify-center">
          {currentStep < steps.length && (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-20 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          )}
        </div>
    </Layout>
  );
};

export default LessonEm;
