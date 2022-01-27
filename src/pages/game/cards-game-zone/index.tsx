import React from 'react';
import Card from 'components/Card';
import { useCardsContext } from 'context/card-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import gameDefaults from 'config/gameConfig';
import GameConfig from './game-config';
import { useGameContext } from 'context/game-context';
import { AnimatePresence, motion } from 'framer-motion';
import { useStopWatchContext } from 'context/timer-context';
import { formatTime, getCardUsed } from 'utils/global';
import Badge from 'components/badge';
// transforming custom component to motion.
const PlayingButtonsMotion = motion(PlayingButtons);

enum LevelStatus {
 ACTIVE = 'Active',
 PASSED = 'Passed',
 LOSE = 'Lose'
}

// Helpers to set class accordingly
const getLevelStatus = function (
 currGameLevel: number,
 platformLevel: number,
 currentLostLevel: number | null,
 isWonGame: boolean
) {
 if (isWonGame) {
  return LevelStatus.PASSED;
 }
 if (platformLevel === currentLostLevel) {
  return LevelStatus.LOSE;
 }
 if (currGameLevel === platformLevel) {
  return LevelStatus.ACTIVE;
 }
 if (currGameLevel > platformLevel) {
  return LevelStatus.PASSED;
 }
 return '';
};

const CardsGameZone = function () {
 const { time } = useStopWatchContext();
 const { cardsInGame, cardsInDeck } = useCardsContext();
 const { level, currentLostLevel, isWonGame, resetGame, isLostGame, gameScore } = useGameContext();

 return (
  <div className={classes.Root}>
   <GameConfig />
   {/* creating a div for each levl in the game --  Game Platform **/}
   <div className={classes.GamePlatform}>
    {Array.from({
     length: gameDefaults.totalLevels
    }).map((_, index) => {
     return (
      <div
       className={`${classes.Level} ${classes[getLevelStatus(level, index, currentLostLevel, isWonGame)] ?? ''}`}
       key={index}
       data-level={index}
      >
       {cardsInGame?.[index]?.map((card) => (
        <Card stack={true} key={'' + card?.value + card?.suit} currentCard={card} />
       ))}
      </div>
     );
    })}
   </div>

   {/* Show Message or playing buttons if we in active game */}
   <AnimatePresence>
    {isWonGame || isLostGame ? (
     <motion.div
      initial={{ opacity: 0, x: '10px' }}
      animate={{
       opacity: 1,
       y: 0
      }}
      transition={{
       duration: 0.5,
       delay: 0.5
      }}
      className={classes.CompleteGameMessage}
     >
      <h1 className={classes.Header}>{isWonGame ? 'Well Done!' : 'You Lost.'}</h1>
      <div className={`${classes.ScoreDetails} text-xs  md:text-sm`}>
       <p>
        Calculated Score:
        <Badge classes={classes.FinalGameScore}>{gameScore}</Badge>
        <span className={classes.Calculation}>
         ({formatTime(time)} seconds + {getCardUsed(cardsInDeck)} Card Used)
        </span>
       </p>
      </div>
      <button onClick={resetGame}>Replay?</button>
     </motion.div>
    ) : (
     <PlayingButtonsMotion
      transition={{
       duration: 0.5
      }}
      exit={{
       y: '-100px'
      }}
     />
    )}
   </AnimatePresence>
  </div>
 );
};

export default CardsGameZone;
