import React from 'react';
import classes from './game-control-bar.module.scss';
import { useGameContext } from 'context/game-context';
import { Link } from 'react-router-dom';
import HelpIcon from 'assets/control-bar-icons/Help.svg';
import ReplayIcon from 'assets/control-bar-icons/Replay.svg';

const GameControlsBar = function () {
  const { resetGame } = useGameContext();

  return (
    <div className={classes.Root}>
      <div className={classes.Container}>
        {/* logo  */}
        <Link className={classes.Logo} to="/">
          Bus Driver
        </Link>
        <div className={classes.buttons}>
          <button className="text-xs" onClick={resetGame}>
            Restart
            <img src={ReplayIcon} alt="ReplayIcon" />
          </button>
          <button className="text-xs">
            How To Play
            <img src={HelpIcon} alt="HelpIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControlsBar;
