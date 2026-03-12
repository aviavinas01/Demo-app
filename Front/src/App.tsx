import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/layout/Footer'; // <-- Import the new footer
import Login from './pages/Signing/Signin';
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">

        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/forums" element={<Forums />} /> */}
          </Routes>
        </div>
        <Footer />

      </div>
    </Router>
  );
};

export default App;