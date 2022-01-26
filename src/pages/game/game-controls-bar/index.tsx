import { useCardsContext } from 'context/card-context';
import classes from './game-control-bar.module.scss';
import React from 'react';
import { useGameContext } from 'context/game-context';
import { Link } from 'react-router-dom';
import HelpIcon from 'assets/control-bar-icons/Help.png';
import ReplayIcon from 'assets/control-bar-icons/Replay.png';

const GameControlsBar = function () {
  const { setCardsInGame, creatDeck } = useCardsContext();
  const { resetGame } = useGameContext();

  // reset game
  const onResetClick = () => {
    setCardsInGame([]);
    creatDeck();
    resetGame();
  };

  return (
    <div className={classes.Root}>
      <div className={classes.Container}>
        {/* logo  */}
        <Link className={classes.Logo} to="/">
          Bus Driver
        </Link>
        <div className={classes.buttons}>
          <button className="text-xs" onClick={onResetClick}>
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
