import React from 'react';
import Timer from './Timer';
import classes from './stop-watch.module.scss';
import ClockIcon from 'assets/config-icons/Stop-Watch.svg';
import { useGameContext } from 'context/game-context';
import { useCardsContext } from 'context/card-context';
import { useStopWatchContext } from 'context/stop-watch';

const StopWatch = () => {
 const { isLostGame, isWonGame, setGameScore } = useGameContext();
 const {
  isStopWatchActive,
  setIsStopWatchActive,
  isReset,
  setIsReset,
  setCurrentGameTime
 } = useStopWatchContext();
 const [stopWatchTime, setStopWatchTime] = React.useState(0);
 const { cardsInDeck } = useCardsContext();

 React.useEffect(() => {
  setCurrentGameTime(stopWatchTime);
  if (isWonGame || isLostGame) {
   setIsStopWatchActive(false);
   const currTime = stopWatchTime / 1000;
   const cardUsed = 52 - (cardsInDeck?.length as number);
   const finalScore = parseFloat((currTime + cardUsed).toFixed(2));
   setGameScore(finalScore);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isLostGame, isWonGame]);

 console.log(isReset);
 React.useEffect(() => {
  let interval: NodeJS.Timer | null = null;
  if (isStopWatchActive) {
   interval = setInterval(() => {
    setStopWatchTime((currentGameTime) => currentGameTime + 10);
   }, 10);
  } else {
   interval && clearInterval(interval);
  }
  return () => {
   interval && clearInterval(interval);
   setIsReset(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isStopWatchActive]);

 React.useEffect(() => {
  if (!isReset) return;
  setStopWatchTime(0);
  setIsReset(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isReset]);

 return (
  <div className={classes.Root}>
   <img src={ClockIcon} alt="Clock Icon" />
   <Timer time={stopWatchTime} />
  </div>
 );
};

export default StopWatch;
