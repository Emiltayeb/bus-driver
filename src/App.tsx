import React from 'react';
import './styles/main.scss';
import GameScreen from 'pages/game';
import OpeningScreen from 'pages/opening-screen';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignInScreen from 'pages/sign-in';

function App() {
 const location = useLocation();

 return (
  <AnimatePresence initial={false} exitBeforeEnter>
   <Routes key={location.pathname} location={location}>
    <Route path="/signIn" element={<SignInScreen />} />
    <Route path="/" element={<OpeningScreen />} />
    <Route path="game" element={<GameScreen />} />
    <Route path="*" element={<h1>Not Found!</h1>} />
   </Routes>
  </AnimatePresence>
 );
}

export default App;
