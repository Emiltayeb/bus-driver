import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import gameDefaults from 'config/gameConfig';
import Bus from 'components/Bus';

const CardsGameZone = function () {
  const { level } = useGameContext();
  const { cardsInGame } = useCardsContext();

  return (
    <div className={classes.Root}>
      <div className={classes.GamePlatform}>
        {/* show level buttons */}
        {Array.from({ length: gameDefaults.totalLevels }).map((_, index) => {
          return (
            <div className={classes.Level} key={index} data-level={index}>
              {cardsInGame?.[index]?.map((card) => (
                <Card
                  stack={true}
                  key={'' + card?.value + card?.suit}
                  currentCard={card}
                />
              ))}
            </div>
          );
        })}
      </div>
      {/* <Bus /> */}
      <PlayingButtons />
    </div>
  );
};

export default CardsGameZone;
