import { useCardsContext } from 'context/card-context';
import classes from './game-control-bar.module.scss';
import React from 'react';
import { useGameContext } from 'context/game-context';

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
        <h1 className={classes.Logo}>Bus Driver</h1>
        {/* <div className={classes.headers}>
        <div className={classes.header}>
          <p className="font-bold">Cards Reaming:</p>
          <Badge>{cardsInDeck?.length}</Badge>
        </div>
        <div className={classes.header}>
          <p className="font-bold">Level :</p> <Badge> {level + 1} / 4</Badge>
        </div>
      </div> */}
        {/* config buttons */}
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
