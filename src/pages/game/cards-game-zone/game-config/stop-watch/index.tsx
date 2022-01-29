import React from 'react';
import Timer from './Timer';
import classes from './stop-watch.module.scss';
import ClockIcon from 'assets/config-icons/Stop-Watch.svg';
import { useGameContext } from 'context/game-context';
import { useCardsContext } from 'context/card-context';

const StopWatch = () => {
 const { isStopWatchActive, isLostGame, isWonGame, setCurrentGameTime, setIsStopWatchActive, setGameScore } =
  useGameContext();
 const [currentGameTime, setTime] = React.useState(0);
 const { cardsInDeck } = useCardsContext();

 React.useEffect(() => {
  console.log('setting game time', currentGameTime);
  setCurrentGameTime(currentGameTime);
  if (isWonGame || isLostGame) {
   setIsStopWatchActive(false);
   const currTime = currentGameTime / 1000;
   const cardUsed = 52 - (cardsInDeck?.length as number);
   const finalScore = parseFloat((currTime + cardUsed).toFixed(2));
   setGameScore(finalScore);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isLostGame, isWonGame]);

 React.useEffect(() => {
  let interval: NodeJS.Timer | null = null;

  if (isStopWatchActive) {
   interval = setInterval(() => {
    setTime((currentGameTime) => currentGameTime + 10);
   }, 10);
  } else {
   interval && clearInterval(interval);
  }
  return () => {
   interval && clearInterval(interval);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isStopWatchActive]);

 return (
  <div className={classes.Root}>
   <img src={ClockIcon} alt="Clock Icon" />
   <Timer time={currentGameTime} />
  </div>
 );
};

export default StopWatch;
