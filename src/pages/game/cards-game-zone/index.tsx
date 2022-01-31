import React from 'react';
import { useCardsContext } from 'context/card-context';
import PlayingButtons from './play-buttons';
import classes from './card-game-zone.module.scss';
import GameConfig from './game-config';
import { useGameContext } from 'context/game-context';
import { AnimatePresence, motion } from 'framer-motion';
import { useStopWatchContext } from 'context/stop-watch';
import GamePlatform from './game-platform';
import EndGameActions from './end-game-actions';

// transforming custom component to motion.
const PlayingButtonsMotion = motion(PlayingButtons);

const CardsGameZone = function () {
 const { cardsInDeck, cardsInGame } = useCardsContext();
 const {
  isWonGame,
  resetGame,
  isLostGame,
  gameScore,
  currentLostLevel,
  level,
  currentUserHighScore
 } = useGameContext();
 const { currentGameTime } = useStopWatchContext();

 return (
  <div className={classes.Root}>
   <GameConfig />
   {/* creating a div for each level in the game --  Game Platform **/}
   <GamePlatform
    isWonGame={isWonGame}
    currentLostLevel={currentLostLevel}
    cardsInGame={cardsInGame}
    level={level}
   />

   {/* Show Message or playing buttons if we in active game */}
   <AnimatePresence>
    {isWonGame || isLostGame ? (
     <EndGameActions
      isWonGame={isWonGame}
      gameScore={gameScore}
      currentGameTime={currentGameTime}
      cardsInDeck={cardsInDeck}
      resetGame={resetGame}
      currentUserHighScore={currentUserHighScore}
     />
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
