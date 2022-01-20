import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import gameDefaults from 'config/gameConfig';
import useMedia from 'custom-hooks/useMedia';
import { setCustomCssProperty } from 'utils/global';
import { breakPoints, cardSizes } from 'config/layout';
import Bus from 'components/Bus';

const CardsGameZone = function () {
  const { level } = useGameContext();
  const { cardsInGame } = useCardsContext();

  const isMobile = useMedia('max-width', breakPoints.tablet);
  React.useEffect(() => {
    setCustomCssProperty(
      '--cardHight',
      isMobile ? cardSizes.phone : cardSizes.tablet
    );
  }, [isMobile]);
  return (
    <div className={`${classes.Root} container mx-auto`}>
      <div className={`${classes.GamePlatform} container`} data-level={level}>
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
      <Bus />
      <PlayingButtons />
    </div>
  );
};

export default CardsGameZone;
