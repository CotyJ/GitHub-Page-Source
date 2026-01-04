import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Navbar from './pages/Navbar';
import Camel from './pages/Camel';
import PhonesFlags from './pages/PhonesFlags';
import Students from './pages/Students';
import Modding from './pages/Modding';

import { useState, useEffect } from 'react';
import MysteryPage from './pages/MysteryPage';

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
          <Route path="/funstuff/camel" element={<Camel theme={theme}/>}/>
          <Route path="/funstuff/modding" element={<Modding theme={theme}/>}/>
          <Route path="/challenges/phones-flags" element={<PhonesFlags />}/>
          <Route path="/challenges/students" element={<Students />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
