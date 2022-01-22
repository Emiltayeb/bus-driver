import React from 'react';
import { useCardsContext } from 'context/card-context';
import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';

const GameScreen = function () {
  const { creatDeck } = useCardsContext();

  //  on first mount - means game is started. make a new deck
  React.useEffect(() => {
    creatDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${classes.Root} container mx-auto`}>
      <GameControlsBar />
      {/* cards level platform.*/}
      <CardsGameZone />
    </div>
  );
};

export default GameScreen;
