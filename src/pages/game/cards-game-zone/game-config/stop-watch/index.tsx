import React from 'react';
import Timer from './Timer';
import classes from './stop-watch.module.scss';
import { useStopWatchContext } from 'context/timer-context';
import ClockIcon from 'assets/config-icons/Stop-Watch.svg';

const StopWatch = () => {
  const { isActive, time, setTime } = useStopWatchContext();

  React.useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      interval && clearInterval(interval);
    }
    return () => {
      interval && clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className={classes.Root}>
      <img src={ClockIcon} alt="Clock Icon" />
      <Timer time={time} />
    </div>
  );
};

export default StopWatch;
