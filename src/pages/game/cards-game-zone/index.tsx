import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import gameDefaults from 'config/gameConfig';
import GameConfig from './game-config';
import { useGameContext } from 'context/game-context';

enum LevelStatus {
  ACTIVE = 'Active',
  PASSED = 'Passed',
  LOSE = 'Lose'
}
const getLevelStatus = function (
  currGameLevel: number,
  platformLevel: number,
  currentLostLevel: number | null,
  isWonGame: boolean
) {
  // console.log({ currGameLevel, platformLevel, currentLostLevel });

  if (platformLevel === currentLostLevel) {
    return LevelStatus.LOSE;
  }
  if (currGameLevel > platformLevel || isWonGame) {
    return LevelStatus.PASSED;
  }
  if (currGameLevel === platformLevel) {
    // its the active one
    return LevelStatus.ACTIVE;
  }

  return '';
};
const CardsGameZone = function () {
  const { cardsInGame } = useCardsContext();
  const { level, currentLostLevel, isWonGame } = useGameContext();

  console.log('render');
  return (
    <div className={classes.Root}>
      <GameConfig />
      <div className={classes.GamePlatform}>
        {Array.from({ length: gameDefaults.totalLevels }).map((_, index) => {
          return (
            <div
              className={`${classes.Level} ${
                classes[
                  getLevelStatus(level, index, currentLostLevel, isWonGame)
                ] ?? ''
              }`}
              key={index}
              data-level={index}
            >
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
