import React from 'react';
import Card from 'components/Card';
import gameDefaults from 'config/gameConfig';
import { getLevelStatus } from 'utils/global';
import classes from '../card-game-zone.module.scss';
import { CardType } from 'types/card-type';

const GamePlatform = (props: any) => {
 const { level, currentLostLevel, isWonGame, cardsInGame } = props;
 return (
  <div className={classes.GamePlatform}>
   {Array.from({
    length: gameDefaults.totalLevels
   }).map((_, index) => {
    return (
     <div
      className={`${classes.Level} ${
       classes[getLevelStatus(level, index, currentLostLevel, isWonGame)] ?? ''
      }`}
      key={index}
      data-level={index}
     >
      {cardsInGame?.[index]?.map((card: CardType) => (
       <Card
        stack={index === 0}
        key={'' + card?.value + card?.suit}
        currentCard={card}
       />
      ))}
     </div>
    );
   })}
  </div>
 );
};

export default GamePlatform;
