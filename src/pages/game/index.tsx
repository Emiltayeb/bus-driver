import React from 'react';

import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';
import AnimatedPage from 'components/aniamtePages';

import { useGameContext } from 'context/game-context';

const GameScreen = function () {
  const { resetGame } = useGameContext();

  //  on first mount - means game is started. make a new deck
  React.useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedPage className={classes.Root}>
      <GameControlsBar />
      <CardsGameZone />
    </AnimatedPage>
  );
};

export default GameScreen;
