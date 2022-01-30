import React from 'react';
import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';
import AnimatedPage from 'components/animatePages';
import { useGameContext } from 'context/game-context';
import { collection, getDocs } from '@firebase/firestore';
import { db } from 'firebase-config';
import { orderBy, query } from 'firebase/firestore';
import getTopPlayers from 'utils/getTopPlayers';

const GameScreen = function () {
 const { resetGame, setTopPlayers } = useGameContext();

 //  start game on entering game  screen
 React.useEffect(() => {
  //  sign user so he can submit score
  const topPLayersRef = collection(db, 'players');
  const q = query(topPLayersRef, orderBy('score', 'asc'));
  getDocs(q).then((snapShot) => {
   setTopPlayers(getTopPlayers(snapShot.docs));
  });
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
