import React from 'react';
import Badge from 'components/bedge';
import classes from './game-config.module.scss';
import { useGameContext } from 'context/game-context';
import { useCardsContext } from 'context/card-context';

const GameConfig = () => {
  const { level } = useGameContext();
  const { cardsInDeck } = useCardsContext();
  return (
    <div className={classes.Root}>
      {/* cards remaining */}
      {/* levels */}
      <div className={classes.GameData}>
        <div className={`text-xs ${classes.Data}`}>
          <span>Level</span> <Badge>{level + 1}</Badge>
        </div>
        <div className={`text-xs ${classes.Data}`}>
          <span>Remaining cards</span> <Badge>{cardsInDeck?.length}</Badge>
        </div>
      </div>
      {/* stop watch */}
      <div className={classes.StopWatch}>Stop Watch</div>
    </div>
  );
};

export default GameConfig;
