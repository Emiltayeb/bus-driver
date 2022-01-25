import { useCardsContext } from 'context/card-context';
import classes from './game-control-bar.module.scss';
import React from 'react';
import { useGameContext } from 'context/game-context';
import { Link } from 'react-router-dom';

const GameControlsBar = function () {
  const { cardsInDeck, setCardsInGame, creatDeck } = useCardsContext();
  const { resetGame } = useGameContext();

  // reset game
  const onResetClick = () => {
    setCardsInGame([]);
    creatDeck();
    resetGame();
  };

  // user lost the game
  React.useEffect(() => {
    if (!cardsInDeck) return;
    console.log('LOST');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsInDeck?.length === 0]);

  return (
    <div className={classes.Root}>
      <div className={classes.Container}>
        {/* logo  */}
        <Link className={classes.Logo} to="/">
          Bus Driver
        </Link>
        <div className={classes.buttons}>
          <button className="text-xs" onClick={onResetClick}>
            Reset Game
          </button>
          <button className="text-xs">How To Play?</button>
        </div>
      </div>
    </div>
  );
};

export default GameControlsBar;
