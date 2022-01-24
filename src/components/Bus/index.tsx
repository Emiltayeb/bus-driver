import { useGameContext } from 'context/game-context';
import React from 'react';
import classes from './bus.module.scss';
import { gsap } from 'gsap';
import gameDefaults from 'config/gameConfig';
function Bus() {
  const { level, isWonGame } = useGameContext();
  const busRef = React.useRef<HTMLSpanElement | null>(null);

  //  1 - 0
  // 2 - 25
  // 3 - 50
  // 4  - 100

  //  1 - 4 * 100
  React.useEffect(() => {
    let busLeftValue = (level / gameDefaults.totalLevels) * 100;
    if (isWonGame) {
      busLeftValue = 95;
    }
    gsap.to(busRef.current, { left: `${busLeftValue}%` });
  }, [level, isWonGame]);
  return (
    <div className={classes.Root}>
      <span ref={busRef}>BUS!</span>
    </div>
  );
}

export default Bus;
