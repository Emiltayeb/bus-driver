import React from 'react';
import './global.css';
import { useGameContext } from 'context/game-context';
import GameScreen from 'pages/game';
import OpeningScreen from 'pages/opening-screen';

function App() {
  const { isGameActive } = useGameContext();

  return (
    <div className='h-screen  bg-gray-200 '>
      {/* TODO::  style opening screen . add insturctions*/}
      {!isGameActive ? <OpeningScreen /> : <GameScreen />}
    </div>
  );
}

export default App;
