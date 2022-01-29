import React from 'react';
import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';
import AnimatedPage from 'components/animatePages';
import { useGameContext } from 'context/game-context';
import { signInAnonymously } from '@firebase/auth';
import 'firebase/database';
import { auth } from 'firebase-config';

const GameScreen = function () {
 const { resetGame } = useGameContext();

 //  start game on entering game  screen
 React.useEffect(() => {
  //  sign user so he can submit score
  signInAnonymously(auth);
  resetGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <AnimatedPage className={classes.Root}>
   <GameControlsBar />
   <CardsGameZone />
  </AnimatedPage>
 );
};

export default GameScreen;
