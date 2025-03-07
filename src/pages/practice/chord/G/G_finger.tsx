import React, { useState, useRef } from 'react';
import Layout from '../../../Layout';
import { Play, HelpCircle, X, Mic } from 'lucide-react';

const G_finger = () => {
  const [currentSound, setCurrentSound] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [noSound, setNoSound] = useState(false);

  const unstrummedStrings = new Set([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const playSound = (soundNumber: number) => {
    if (unstrummedStrings.has(soundNumber)) return;
    
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(`/sounds/G_${soundNumber}.wav`);
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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">G Chord Fingering</h1>
            <button
              onClick={() => setShowTips(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Help"
            >
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <button
            onClick={isMicActive ? stopListening : startListening}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              isMicActive
                ? 'bg-green-600 hover:bg-green-700 ring-2 ring-green-500 ring-offset-2'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            <Mic className={`h-5 w-5 mr-2 ${isMicActive ? 'animate-pulse' : ''}`} />
            {isMicActive ? 'Microphone Active' : 'Enable Microphone'}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Image on the left */}
          <div className="w-1/3">
            <img
              src="https://images.unsplash.com/photo-1740559653501-aa337f59ab01?q=80&w=1780&auto=format&fit=crop"
              alt="Guitar chord reference"
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Guitar neck visualization */}
          <div className="flex-1">
            <div className="flex justify-between px-4 ml-12 mb-1">
              {[1, 2, 3, 4, 5].map((number) => (
                <div
                  key={number}
                  className="text-sm font-medium text-gray-600 flex items-center justify-center"
                  style={{ width: `${(100 - 12) / 5}%` }}
                >
                  {number}
                </div>
              ))}
            </div>

            <div className="relative w-full h-[400px] bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl overflow-hidden">
              {/* Nut (left side) */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-200 to-gray-100 border-r-2 border-gray-400 flex flex-col justify-between py-4">
                {['E', 'A', 'D', 'G', 'B', 'e'].map((string, index) => (
                  <div
                    key={string}
                    className="relative h-[48px] flex items-center justify-center"
                  >
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
                <div
                  key={i}
                  className="absolute h-full w-[1px] bg-gray-400"
                  style={{ left: `${((i + 1) * (100 - 12)) / 5 + 12}%` }}
                />
              ))}

              {/* Finger position indicators */}
              <div
                className="absolute w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${((3 - 0.5) * (100 - 12)) / 5 + 12}%`,
                  top: `${(0 * 400) / 6 + 400 / 12}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => playSound(6)}
              >
                2
              </div>

              <div
                className="absolute w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${((2 - 0.5) * (100 - 12)) / 5 + 12}%`,
                  top: `${(1 * 400) / 6 + 400 / 12}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => playSound(5)}
              >
                1
              </div>

              <div
                className="absolute w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${((3 - 0.5) * (100 - 12)) / 5 + 12}%`,
                  top: `${(5 * 400) / 6 + 400 / 12}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => playSound(1)}
              >
                3
              </div>
            </div>
          </div>

          {/* String Sound controls - Vertical on the right */}
          <div className="w-32">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Strings</h3>
            <div className="flex flex-col gap-3">
              {[6, 5, 4, 3, 2, 1].map((number) => (
                <button
                  key={number}
                  onClick={() => playSound(number)}
                  disabled={unstrummedStrings.has(number)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                    unstrummedStrings.has(number)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : currentSound === number
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    <span>{number}</span>
                  </div>
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
                <h2 className="text-2xl font-bold">How to Play G Chord</h2>
                <button
                  onClick={() => setShowTips(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Finger Placement</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Place your second finger (green) on the 6th string, 3rd fret</li>
                    <li>Place your first finger (blue) on the 5th string, 2nd fret</li>
                    <li>Keep the 4th string open</li>
                    <li>Keep the 3rd string open</li>
                    <li>Keep the 2nd string open</li>
                    <li>Place your third finger (red) on the 1st string, 3rd fret</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Common Mistakes</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Not pressing hard enough on the strings</li>
                    <li>Muting the open strings</li>
                    <li>Incorrect finger placement affecting sound clarity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Practice Tips</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Practice transitioning slowly from other chords</li>
                    <li>Check each string individually for clear sound</li>
                    <li>Keep your thumb behind the neck for better leverage</li>
                    <li>Focus on keeping the open strings ringing clearly</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowTips(false)}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default G_finger;