import React from 'react';
import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';
import AnimatedPage from 'components/animatePages';
import { useGameContext } from 'context/game-context';
import { collection, getDocs } from '@firebase/firestore';
import { auth, db } from 'firebase-config';
import { orderBy, query, where } from 'firebase/firestore';
import getTopPlayers from 'utils/getTopPlayers';
import { useAuthState } from 'react-firebase-hooks/auth';

const GameScreen = function () {
 const { resetGame, setTopPlayers, setCurrentUserHighScore } = useGameContext();
 const [user, loading] = useAuthState(auth);
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

 React.useEffect(() => {
  if (!user?.displayName || loading) {
   setCurrentUserHighScore(null);
   return;
  }
  const colRef = collection(db, 'players');
  const highScoreQuery = query(colRef, where('name', '==', user?.displayName));
  getDocs(highScoreQuery).then((doc) => {
   const currentHighScore = doc.docs[0].data().score;
   if (!currentHighScore) return;
   console.log(currentHighScore);
   setCurrentUserHighScore(currentHighScore);
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [loading]);
 return (
  <AnimatedPage className={classes.Root}>
   <GameControlsBar />
   <CardsGameZone />
  </AnimatedPage>
 );
};

export default GameScreen;
