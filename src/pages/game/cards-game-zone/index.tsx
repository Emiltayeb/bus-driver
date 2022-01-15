import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';

const CardsGameZone = function () {
  const { level } = useGameContext();
  const { cardsInGame } = useCardsContext();

  console.log({ cardsInGame });
  // ...code
  return (
    <div className={classes.Root}>
      {/* pass here the cards in game.
	when you draw card, you push it to array of objects :
	[
		 level 1 - Card,Card,
		level 2 - Card, CArd
	]

	then you map over the array based on level. basically only the first level should get stacked,
*/}{' '}
      <div className={`${classes.GamePlatform} container`} data-level={level}>
        <div className={classes?.cards ?? ''}>
          {cardsInGame?.[level]?.length > 0 &&
            cardsInGame?.[level]?.map((card) => (
              <Card
                stack={level === 0}
                key={'' + card?.value + card?.suit}
                currentCard={card}
              />
            ))}
        </div>
      </div>
      {/* show level buttons */}
      <PlayingButtons />
    </div>
  );
};

export default CardsGameZone;
