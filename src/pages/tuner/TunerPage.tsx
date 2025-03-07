import React, { useState, useEffect, useRef } from 'react';
import { Mic, HelpCircle, X, Play } from 'lucide-react';
import { PitchDetector } from 'pitchy';
import Layout from '../Layout';

const GUITAR_STRINGS = [
  {
    note: 'E2',
    freq: 82.41,
    position: 'Sixth String (Low E)',
  },
  {
    note: 'A2',
    freq: 110.0,
    position: 'Fifth String (A)',
  },
  {
    note: 'D3',
    freq: 146.83,
    position: 'Fourth String (D)',
  },
  {
    note: 'G3',
    freq: 196.0,
    position: 'Third String (G)',
  },
  {
    note: 'B3',
    freq: 246.94,
    position: 'Second String (B)',
  },
  {
    note: 'e4',
    freq: 329.63,
    position: 'First String (High E)',
  },
];

const TunerPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentFreq, setCurrentFreq] = useState<number | null>(null);
  const [selectedString, setSelectedString] = useState<(typeof GUITAR_STRINGS)[0] | null>(null);
  const [tuningStatus, setTuningStatus] = useState<'flat' | 'sharp' | 'in-tune' | null>(null);
  const [isMicActive, setIsMicActive] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(50);
  const [lastValidFreq, setLastValidFreq] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [noSound, setNoSound] = useState(false);
  const [tunedStrings, setTunedStrings] = useState<Set<string>>(new Set());
  const [currentPlayingString, setCurrentPlayingString] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const noSoundTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playStringSound = (stringNumber: number) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(`/sounds/tuner/string_${stringNumber}.wav`);
    newAudio.play();
    setAudio(newAudio);
    setCurrentPlayingString(stringNumber);
    newAudio.onended = () => setCurrentPlayingString(null);
  };

  const findClosestString = (freq: number) => {
    let closestString = GUITAR_STRINGS[0];
    let smallestDiff = Math.abs(
      (freq - GUITAR_STRINGS[0].freq) / GUITAR_STRINGS[0].freq
    );

    GUITAR_STRINGS.forEach((string) => {
      const diff = Math.abs((freq - string.freq) / string.freq);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestString = string;
      }
    });

    return smallestDiff <= 0.2 ? closestString : null;
  };

  const calculateIndicatorPosition = (freq: number, targetFreq: number) => {
    const percentageDiff = ((freq - targetFreq) / targetFreq) * 100;
    const scaledDiff = percentageDiff * 4;
    return Math.max(0, Math.min(100, 50 + scaledDiff));
  };

  const checkTuning = (freq: number, targetFreq: number) => {
    const percentageDiff = ((freq - targetFreq) / targetFreq) * 100;
    if (Math.abs(percentageDiff) <= 1) return 'in-tune';
    return percentageDiff > 0 ? 'sharp' : 'flat';
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();

      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;

      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      const detector = PitchDetector.forFloat32Array(
        analyserRef.current.fftSize
      );
      const input = new Float32Array(detector.inputLength);
      let silenceCounter = 0;

      const updatePitch = () => {
        analyserRef.current!.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(
          input,
          audioContextRef.current!.sampleRate
        );

        if (pitch !== null && clarity >= 0.8) {
          silenceCounter = 0;
          setNoSound(false);
          if (noSoundTimeoutRef.current) {
            clearTimeout(noSoundTimeoutRef.current);
          }

          const closestString = findClosestString(pitch);
          if (closestString) {
            setSelectedString(closestString);
            setCurrentFreq(pitch);
            setLastValidFreq(pitch);
            setIndicatorPosition(
              calculateIndicatorPosition(pitch, closestString.freq)
            );
            const newTuningStatus = checkTuning(pitch, closestString.freq);
            setTuningStatus(newTuningStatus);

            if (newTuningStatus === 'in-tune') {
              setTunedStrings((prev) => new Set([...prev, closestString.note]));
            }
          } else if (lastValidFreq !== null) {
            setCurrentFreq(lastValidFreq);
          }
        } else {
          silenceCounter++;
          if (silenceCounter > 100) {
            setNoSound(true);
          }
        }

        rafIdRef.current = requestAnimationFrame(updatePitch);
      };

      updatePitch();
      setIsListening(true);
      setIsMicActive(true);
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
    setIsListening(false);
    setCurrentFreq(null);
    setLastValidFreq(null);
    setTuningStatus(null);
    setIsMicActive(false);
    setIndicatorPosition(50);
    setNoSound(false);
    setSelectedString(null);
  };

  useEffect(() => {
    return () => {
      stopListening();
      if (noSoundTimeoutRef.current) {
        clearTimeout(noSoundTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900">Guitar Tuner</h1>
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Help"
            >
              <HelpCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <button
            onClick={isListening ? stopListening : startListening}
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

        <div className="flex justify-center gap-4 mb-4">
          {GUITAR_STRINGS.map((string, index) => (
            <div key={string.note} className="flex flex-col items-center gap-2">
              <button
                onClick={() => isMicActive && setSelectedString(string)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  tunedStrings.has(string.note)
                    ? 'bg-green-500 text-white scale-110 ring-4 ring-green-200'
                    : selectedString?.note === string.note
                    ? 'bg-blue-500 text-white scale-110 ring-4 ring-blue-200'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${!isMicActive && 'cursor-default'}`}
                disabled={!isMicActive}
              >
                {string.note}
              </button>
              <button
                onClick={() => playStringSound(6 - index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  currentPlayingString === 6 - index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Play className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="w-full max-w-2xl mx-auto h-[300px] bg-gradient-to-r from-amber-100 to-amber-200 rounded-t-xl relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-200 to-gray-100 border-r border-gray-400 flex flex-col justify-between py-4">
              {GUITAR_STRINGS.map((string, index) => (
                <div
                  key={string.note}
                  className="relative h-[48px] flex items-center justify-center"
                >
                  <span className="text-gray-800 font-medium">
                    {string.note.charAt(0)}
                  </span>
                </div>
              ))}
            </div>

            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-[1px] bg-gray-400"
                style={{ left: `${(i + 1) * (100 / 13)}%` }}
              />
            ))}

            {[3, 5, 7, 9].map((fret) => (
              <div
                key={fret}
                className="absolute w-4 h-4 rounded-full bg-gray-400"
                style={{
                  left: `${fret * (100 / 13) + 100 / 13 / 2}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {GUITAR_STRINGS.map((string, index) => (
              <div
                key={string.note}
                className={`absolute w-[calc(100%-3rem)] right-0 h-[2px] transition-colors duration-300 ${
                  tunedStrings.has(string.note)
                    ? 'bg-green-500'
                    : selectedString?.note === string.note
                    ? 'bg-blue-500'
                    : 'bg-gray-600'
                } ${
                  selectedString?.note === string.note ||
                  tunedStrings.has(string.note)
                    ? 'opacity-100'
                    : 'opacity-80'
                }`}
                style={{
                  top: `${index * 48 + 24}px`,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          <div className="relative h-40 bg-gray-100 rounded-b-xl border-t border-gray-300 max-w-2xl mx-auto">
            <div className="absolute top-2 left-0 right-0 text-center space-y-1">
              <span
                className={`text-lg font-bold ${
                  tuningStatus === 'in-tune'
                    ? 'text-green-600'
                    : tuningStatus === 'flat'
                    ? 'text-blue-600'
                    : tuningStatus === 'sharp'
                    ? 'text-red-600'
                    : 'text-gray-400'
                }`}
              >
                {!isMicActive
                  ? 'Enable microphone to start'
                  : tuningStatus === 'in-tune'
                  ? '✓ In Tune'
                  : tuningStatus === 'flat'
                  ? '↓ Too Low'
                  : tuningStatus === 'sharp'
                  ? '↑ Too High'
                  : '—'}
              </span>
              <div className="text-sm text-gray-600">
                {!isMicActive
                  ? 'Waiting for microphone...'
                  : currentFreq
                  ? `${currentFreq.toFixed(1)} Hz`
                  : selectedString
                  ? `Target: ${selectedString.freq} Hz`
                  : 'Play a string to begin'}
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="h-12 flex items-center justify-center relative">
                  <div className="absolute w-full flex justify-between px-4 -top-2">
                    {[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25].map(
                      (value) => (
                        <span
                          key={value}
                          className="text-xs text-gray-600 absolute"
                          style={{
                            left: `${((value + 25) / 50) * 100}%`,
                            transform: 'translateX(-50%)',
                          }}
                        >
                          {value}
                        </span>
                      )
                    )}
                  </div>

                  <div className="w-full h-0.5 bg-gray-300 mt-4" />

                  <div
                    className="absolute h-8 w-0.5 bg-red-500 transition-all duration-150"
                    style={{
                      left: `${indicatorPosition}%`,
                      bottom: 0,
                      transform: 'translateX(-50%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {noSound && isMicActive && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-yellow-50 rounded-lg text-yellow-800 text-center shadow-lg">
              <p className="font-medium">No sound detected!</p>
              <p className="text-sm mt-1">Try plucking a string</p>
            </div>
          )}
        </div>

        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  How to Use the Guitar Tuner
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Getting Started
                  </h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Click "Enable Microphone" to start the tuner</li>
                    <li>Hold your guitar close to your device's microphone</li>
                    <li>Pluck one string at a time</li>
                    <li>Wait for the tuner to detect the note</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Reading the Tuner
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      The red line shows if your string is sharp (too high) or
                      flat (too low)
                    </li>
                    <li>Center position (0) means the string is in tune</li>
                    <li>
                      The colored strings show which string you're currently
                      tuning
                    </li>
                    <li>Follow the frequency (Hz) to match the target note</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Tips</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Tune in a quiet environment for better accuracy</li>
                    <li>
                      Pluck the strings with medium strength - not too soft, not
                      too hard
                    </li>
                    <li>Let each note ring out clearly</li>
                    <li>
                      Start with the low E string (thickest) and work your way
                      up
                    </li>
                    <li>
                      Use the play button under each string to hear the correct
                      pitch
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowHelp(false)}
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

export default TunerPage;