import React from 'react';
import { useCardsContext } from 'context/card-context';
import CardsGameZone from './cards-game-zone';
import GameControlsBar from './game-controls-bar';
import classes from './game.module.scss';
import AnimatedPage from 'components/aniamtePages';
import { useStopWatchContext } from 'context/timer-context';

const GameScreen = function () {
  const { creatDeck } = useCardsContext();
  const { setIsActive } = useStopWatchContext();

  //  on first mount - means game is started. make a new deck
  React.useEffect(() => {
    creatDeck();
    setIsActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedPage className={classes.Root}>
      <GameControlsBar />
      {/* cards level platform.*/}
      <CardsGameZone />
    </AnimatedPage>
  );
};

export default GameScreen;
