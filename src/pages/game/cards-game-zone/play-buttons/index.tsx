import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import classes from './play-buttons.module.scss';
import React from 'react';
import { validateLevel } from 'utils/level-rules-validator';
import { UserChoiceOptions } from 'types/rule-validator-type';
import gameDefaults from 'config/gameConfig';
import { motion, AnimationControls, TargetAndTransition } from 'framer-motion';

const variance: Record<string, AnimationControls | TargetAndTransition> = {
 hidden: {
  x: '-50px',
  opacity: 0
 },
 visible: {
  x: 0,
  opacity: 1
 }
};

const PlayingButtons = React.forwardRef((_props, ref) => {
 const [userChoice, setUserChoice] = React.useState<UserChoiceOptions | null>(null);
 const { level, handelWinLevel, handelLoseLevel, currentLostLevel, setIsWonGame } = useGameContext();
 const { drawCard, currentCard, cardsInGame } = useCardsContext();

 // when user draw card -validate
 React.useEffect(() => {
  if (!userChoice) return;
  const isValid = validateLevel({ level, cardsInGame, userChoice, setIsWonGame });
  isValid ? handelWinLevel() : handelLoseLevel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [currentCard]);

 // functions
 const onPlayButtonClick = (buttonText: UserChoiceOptions) => () => {
  drawCard(level);
  setUserChoice(buttonText);
 };

 return (
  <div className={classes.Root} ref={ref as React.MutableRefObject<HTMLDivElement>}>
   {gameDefaults.levelButtonsOptions[level]?.map(({ text, Icon }, index) => {
    return (
     <motion.button
      variants={variance as any}
      initial="hidden"
      animate="visible"
      exit={{ y: -100 }}
      transition={{
       duration: 0.5,
       delay: 0.2,
       ease: 'easeInOut',
       stiffness: 500
      }}
      disabled={currentLostLevel !== null && currentLostLevel !== 0}
      data-variant={text}
      className={`${classes.button} rounded text-white 
                     transition duration-300`}
      type="button"
      key={text + index + level}
      onClick={onPlayButtonClick(text)}
     >
      {Icon && <Icon />}
      <span>{text.toLocaleUpperCase()}</span>
     </motion.button>
    );
   })}
  </div>
 );
});
export default PlayingButtons;
