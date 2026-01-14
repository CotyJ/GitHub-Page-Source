import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

// Import right away
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import REPOS from './config/repos';

// Lazy load
const About = lazy(() => import('./pages/About'))
const Camel = lazy(() => import('./pages/Camel'))
const Modding = lazy(() => import('./pages/Modding'))
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'))
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
          <Route path="/funstuff/camel" element={
            <Suspense fallback={<div>Loading..</div>}>
              <Camel theme={theme}/>
            </Suspense>
            }/>
          <Route path="/funstuff/modding" element={<Modding theme={theme}/>}/>
          {REPOS.map((repo) =>
          <Route key={repo.name} path={`/challenges/${repo.name}`} element={<ChallengesPage repo={repo} />} />
          )}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
