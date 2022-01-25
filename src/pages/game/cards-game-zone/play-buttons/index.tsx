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
  const [userChoice, setUserChoice] = React.useState<UserChoiceOptions | null>(
    null
  );
  const { level, handelWinLevel, handelLoseLevel, currentLostLevel } =
    useGameContext();
  const { drawCard, currentCard, cardsInGame } = useCardsContext();

  // when user draw card -validate
  React.useEffect(() => {
    if (!userChoice) return;
    const isValid = validateLevel({ level, cardsInGame, userChoice });
    isValid ? handelWinLevel() : handelLoseLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  // functions
  const onPlayButtonClick = (buttonText: UserChoiceOptions) => () => {
    drawCard(level);
    setUserChoice(buttonText);
  };

  return (
    <div
      className={classes.Root}
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      {gameDefaults.levelButtonsOptions[level]?.map((buttonData, index) => {
        return (
          <motion.button
            variants={variance as any}
            initial="hidden"
            animate="visible"
            exit="wonGame"
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: 'easeInOut',
              stiffness: 500
            }}
            disabled={currentLostLevel !== null && currentLostLevel !== 0}
            data-variant={buttonData.text}
            className={`${classes.button} rounded text-white 
                     transition duration-300`}
            type="button"
            key={buttonData.text + index + level}
            onClick={onPlayButtonClick(buttonData.text)}
          >
            {buttonData.icon && (
              <img src={buttonData.icon} alt={buttonData.text} />
            )}
            <span>{buttonData.text.toLocaleUpperCase()}</span>
          </motion.button>
        );
      })}
    </div>
  );
});
export default PlayingButtons;
