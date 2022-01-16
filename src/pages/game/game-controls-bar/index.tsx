import { useCardsContext } from 'context/card-context';
import classes from './game-control-bar.module.scss';
import React from 'react';
import { useGameContext } from 'context/game-context';
import Badge from 'components/bedge';

const GameControlsBar = function () {
  const { cardsInDeck, setCardsInGame, creatDeck } = useCardsContext();
  const { level, resetGame } = useGameContext();

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
  }, [cardsInDeck?.length === 0]);

  return (
    <div className={classes.Root}>
      <div className={classes.headers}>
        <div className={classes.header}>
          <p className='font-bold'>Cards Reaming:</p>
          <Badge>{cardsInDeck?.length}</Badge>
        </div>
        <div className={classes.header}>
          <p className='font-bold'>Level :</p> <Badge> {level} / 4</Badge>
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          className='md:px-7 py-2 bg-blue-300 rounded text-white 
         transition duration-300'
          onClick={onResetClick}>
          Reset Game
        </button>
        <button
          className='md:px-7 py-2 bg-blue-300 rounded text-white 
         transition duration-300'>
          How To Play?
        </button>
      </div>
    </div>
  );
};

export default GameControlsBar;
