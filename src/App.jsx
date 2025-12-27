import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Navbar from './pages/Navbar';
import Camel from './pages/Camel';
import PhonesFlags from './pages/PhonesFlags';
import Students from './pages/Students';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className='page-wrapper'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/funstuff/camel" element={<Camel />}/>
          <Route path="/challenges/phones-flags" element={<PhonesFlags />}/>
          <Route path="/challenges/students" element={<Students />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
