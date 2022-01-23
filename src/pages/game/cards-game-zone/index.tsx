import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import gameDefaults from 'config/gameConfig';
import Bus from 'components/Bus';
import GameConfig from './game-config';

const CardsGameZone = function () {
  const { cardsInGame } = useCardsContext();

  return (
    <div className={classes.Root}>
      <GameConfig />
      <div className={classes.GamePlatform}>
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
