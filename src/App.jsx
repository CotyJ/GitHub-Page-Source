import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

// Import right away
import Home from './pages/Home';
import Navbar from './pages/Navbar';

// Lazy load
const About = lazy(() => import('./pages/About'))
const Camel = lazy(() => import('./pages/Camel'))
const Modding = lazy(() => import('./pages/Modding'))
const Students = lazy(() => import('./pages/Students'))
const PhonesFlags = lazy(() => import('./pages/PhonesFlags'))
const MysteryPage = lazy(() => import('./pages/MysteryPage'))
// TODO: Add Suspense where needed like Camel below where needed

function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HashRouter>
      <Navbar theme={theme} setTheme={setTheme}/>
      <div id='page-wrapper'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/funstuff/mystery-page" element={<MysteryPage />} />
          <Route path="/funstuff/camel" element={
            <Suspense fallback={<div>Loading..</div>}>
              <Camel theme={theme}/>
            </Suspense>
            }/>
          <Route path="/funstuff/modding" element={<Modding theme={theme}/>}/>
          <Route path="/challenges/phones-flags" element={<PhonesFlags />}/>
          <Route path="/challenges/students" element={<Students />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
