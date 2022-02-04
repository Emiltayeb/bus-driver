import React from 'react';
import Timer from './Timer';
import classes from './stop-watch.module.scss';
import ClockIcon from 'assets/config-icons/Stop-Watch.svg';
import { useGameContext } from 'context/game-context';
import { useCardsContext } from 'context/card-context';
import { StopWatchState, useStopWatchContext } from 'context/stop-watch';

const StopWatch = () => {
 const { isLostGame, isWonGame, setGameScore } = useGameContext();
 const { setCurrentGameTime, stopWatchState, setStopWatchState } =
  useStopWatchContext();
 const { cardsInDeck } = useCardsContext();

 const [stopWatchTime, setStopWatchTime] = React.useState(0);
 const stopWatchIntervalRef = React.useRef<any>(null);

 //  Boot
 React.useEffect(() => {
  return () => {
   clearInterval(stopWatchIntervalRef.current);
  };
 }, []);

 React.useEffect(() => {
  switch (stopWatchState) {
   case StopWatchState.ACTIVE:
    console.log('Active');
    stopWatchIntervalRef.current = setInterval(() => {
     console.log('clock ticking..');
     setStopWatchTime((currentGameTime) => currentGameTime + 10);
    }, 10);
    break;
   case StopWatchState.PAUSED:
    clearInterval(stopWatchIntervalRef.current);
    break;
   case StopWatchState.RESET:
    console.log('reset :(');
    setStopWatchTime(0);
    clearInterval(stopWatchIntervalRef.current);
    setStopWatchState(StopWatchState.ACTIVE);
    break;
   default:
    break;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [stopWatchState]);

 React.useEffect(() => {
  if (isWonGame || isLostGame) {
   setCurrentGameTime(stopWatchTime);
   setStopWatchState(StopWatchState.PAUSED);
   const currTime = stopWatchTime / 1000;
   const cardUsed = 52 - (cardsInDeck?.length as number);
   const finalScore = parseFloat((currTime + cardUsed).toFixed(2));
   setGameScore(finalScore);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isLostGame, isWonGame]);

 return (
  <div className={classes.Root}>
   <img src={ClockIcon} alt="Clock Icon" />
   <Timer time={stopWatchTime} />
  </div>
 );
};

export default StopWatch;
