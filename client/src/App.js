// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
// import Loader from './components/Loader';
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";
// import fruitsDesktop1x from "./assets/fruits-desktop@1x.png";
// import fruitsDesktop2x from "./assets/fruits-desktop@2x.png";
// import fruitsDesktop3x from "./assets/fruits-desktop@3x.png";
// import fruitsDesktop4x from "./assets/fruits-desktop@4x.png";

function App() {
  return (
    <Router basename="/slim-mom">
      {/* <div className="desktop-image">
          <img
            src={fruitsDesktop1x}
            srcSet={`${fruitsDesktop2x} 2x, ${fruitsDesktop3x} 3x,${fruitsDesktop4x} 4x,`}
            alt="fruits for desktop image"
            className="fruits-desktop"
          /> */}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
