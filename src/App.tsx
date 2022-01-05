import React from 'react';
// import classes from './App.module.css';
import { useGameContext } from 'context/game-context';
import GameScreen from "pages/game"
import OpeningScreen from "pages/opening-screen"

function App() {

  const { isGameActive } = useGameContext()

  return (
    <div>
      {/* TODO::  style opening screen . add insturctions*/}
      {!isGameActive ? <OpeningScreen /> : <GameScreen />}
    </div>
  );
}

export default App;
