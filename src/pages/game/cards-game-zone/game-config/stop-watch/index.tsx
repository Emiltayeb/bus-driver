import React from 'react';
import Timer from './Timer';
import classes from './stop-watch.module.scss';
import ClockIcon from 'assets/config-icons/Stop-Watch.svg';
import { useGameContext } from 'context/game-context';

const StopWatch = () => {
 const { isStopWatchActive, currentGameTime, setCurrentGameTime } = useGameContext();

 React.useEffect(() => {
  let interval: NodeJS.Timer | null = null;

  if (isStopWatchActive) {
   interval = setInterval(() => {
    setCurrentGameTime((currentGameTime) => currentGameTime + 10);
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
