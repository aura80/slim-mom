import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";
import DiaryPage from './components/DiaryPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
    </>
  );
}

export default App;
