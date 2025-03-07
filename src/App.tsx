import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import TeamSection from './components/TeamSection';
import LoginModal from './components/LoginModal';
import CoursePage from './pages/course/CoursePage';
import TunerPage from './pages/tuner/TunerPage';
import PracticePage from './pages/practice/PracticePage';
import HistoryPage from './pages/HistoryPage';
import Course1 from './pages/course/Course1';
import Course2 from './pages/course/Course2';
import Course3 from './pages/course/Course3';
import Course4 from './pages/course/Course4';
import Em from './pages/course/1/Em';
import Am from './pages/course/1/Am';
import C from './pages/course/1/C';
import D from './pages/course/2/D';
import G from './pages/course/2/G';
import A from './pages/course/2/A';
import E from './pages/course/3/E';
import F from './pages/course/3/F';
import Bm from './pages/course/3/Bm';
import B from './pages/course/4/B';
import Dm from './pages/course/4/Dm';
import Fm from './pages/course/4/Fm';

// Import all Course1 Intro components
import IntroEm from './pages/course/1/Em/IntroEm';

// Import all Course1 Lesson components
import LessonEm from './pages/course/1/Em/LessonEm';

// Import all Course1 Test components
import TestEm from './pages/course/1/Em/TestEm';

// Import all chord practice components
import Em_finger from './pages/practice/chord/Em/Em_finger';
import Em_strum from './pages/practice/chord/Em/Em_strum';
import Am_finger from './pages/practice/chord/Am/Am_finger';
import Am_strum from './pages/practice/chord/Am/Am_strum';
import C_finger from './pages/practice/chord/C/C_finger';
import C_strum from './pages/practice/chord/C/C_strum';
import D_finger from './pages/practice/chord/D/D_finger';
import D_strum from './pages/practice/chord/D/D_strum';
import G_finger from './pages/practice/chord/G/G_finger';
import G_strum from './pages/practice/chord/G/G_strum';
import A_finger from './pages/practice/chord/A/A_finger';
import A_strum from './pages/practice/chord/A/A_strum';
import E_finger from './pages/practice/chord/E/E_finger';
import E_strum from './pages/practice/chord/E/E_strum';
import F_finger from './pages/practice/chord/F/F_finger';
import F_strum from './pages/practice/chord/F/F_strum';
import Bm_finger from './pages/practice/chord/Bm/Bm_finger';
import Bm_strum from './pages/practice/chord/Bm/Bm_strum';
import B_finger from './pages/practice/chord/B/B_finger';
import B_strum from './pages/practice/chord/B/B_strum';
import Dm_finger from './pages/practice/chord/Dm/Dm_finger';
import Dm_strum from './pages/practice/chord/Dm/Dm_strum';
import Fm_finger from './pages/practice/chord/Fm/Fm_finger';
import Fm_strum from './pages/practice/chord/Fm/Fm_strum';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/Course1" element={<Course1 />} />
        <Route path="/Course2" element={<Course2 />} />
        <Route path="/Course3" element={<Course3 />} />
        <Route path="/Course4" element={<Course4 />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/tuner" element={<TunerPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/IntroEm" element={<IntroEm />} />
        <Route path="/LessonEm" element={<LessonEm />} />
        <Route path="/TestEm" element={<TestEm />} />

        {/* Chord practice routes */}
        <Route path="/practice/chord/Em/finger" element={<Em_finger />} />
        <Route path="/practice/chord/Em/strumming" element={<Em_strum />} />
        <Route path="/practice/chord/Am/finger" element={<Am_finger />} />
        <Route path="/practice/chord/Am/strumming" element={<Am_strum />} />
        <Route path="/practice/chord/C/finger" element={<C_finger />} />
        <Route path="/practice/chord/C/strumming" element={<C_strum />} />
        <Route path="/practice/chord/D/finger" element={<D_finger />} />
        <Route path="/practice/chord/D/strumming" element={<D_strum />} />
        <Route path="/practice/chord/G/finger" element={<G_finger />} />
        <Route path="/practice/chord/G/strumming" element={<G_strum />} />
        <Route path="/practice/chord/A/finger" element={<A_finger />} />
        <Route path="/practice/chord/A/strumming" element={<A_strum />} />
        <Route path="/practice/chord/E/finger" element={<E_finger />} />
        <Route path="/practice/chord/E/strumming" element={<E_strum />} />
        <Route path="/practice/chord/F/finger" element={<F_finger />} />
        <Route path="/practice/chord/F/strumming" element={<F_strum />} />
        <Route path="/practice/chord/Bm/finger" element={<Bm_finger />} />
        <Route path="/practice/chord/Bm/strumming" element={<Bm_strum />} />
        <Route path="/practice/chord/B/finger" element={<B_finger />} />
        <Route path="/practice/chord/B/strumming" element={<B_strum />} />
        <Route path="/practice/chord/Dm/finger" element={<Dm_finger />} />
        <Route path="/practice/chord/Dm/strumming" element={<Dm_strum />} />
        <Route path="/practice/chord/Fm/finger" element={<Fm_finger />} />
        <Route path="/practice/chord/Fm/strumming" element={<Fm_strum />} />
        
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/Em" element={<Em />} />
        <Route path="/Am" element={<Am />} />
        <Route path="/C" element={<C />} />
        <Route path="/D" element={<D />} />
        <Route path="/G" element={<G />} />
        <Route path="/A" element={<A />} />
        <Route path="/E" element={<E />} />
        <Route path="/F" element={<F />} />
        <Route path="/Bm" element={<Bm />} />
        <Route path="/B" element={<B />} />
        <Route path="/Dm" element={<Dm />} />
        <Route path="/Fm" element={<Fm />} />
        <Route
          path="/"
          element={
            <div className="relative">
              <NavBar
                onLoginClick={() => setIsLoginOpen(true)}
                showLogin={showLogin}
              />
              <main>
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <TeamSection onLoginClick={() => setIsLoginOpen(true)} />
              </main>
              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;