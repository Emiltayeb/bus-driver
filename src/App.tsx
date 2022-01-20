import React from 'react';
import 'global-styles/global.css';
import { useGameContext } from 'context/game-context';
import GameScreen from 'pages/game';
import OpeningScreen from 'pages/opening-screen';

function App() {
  const { isGameActive } = useGameContext();

  return <>{!isGameActive ? <OpeningScreen /> : <GameScreen />}</>;
}

export default App;
