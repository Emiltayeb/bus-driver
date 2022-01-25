import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import classes from './play-buttons.module.scss';
import React from 'react';
import { validateLevel } from 'utils/level-rules-validator';
import { UserChoiceOptions } from 'types/rule-validator-type';
import gameDefaults from 'config/gameConfig';

const PlayingButtons = function () {
  const [userChoice, setUserChoice] = React.useState<UserChoiceOptions | null>(
    null
  );
  const { level, handelWinLevel, handelLoseLevel, currentLostLevel } =
    useGameContext();
  const { drawCard, currentCard, cardsInGame } = useCardsContext();

  // when user draw card -validate
  React.useEffect(() => {
    if (!userChoice) return;
    setTimeout(() => {
      const isValid = validateLevel({ level, cardsInGame, userChoice });
      isValid ? handelWinLevel() : handelLoseLevel();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  // functions
  const onPlayButtonClick = (buttonText: UserChoiceOptions) => () => {
    drawCard(level);
    setUserChoice(buttonText);
  };

  return (
    <div className={classes.Root}>
      {gameDefaults.levelButtonsOptions[level]?.map((buttonData) => (
        <button
          disabled={currentLostLevel !== null && currentLostLevel !== 0}
          data-variant={buttonData.text}
          className={`${classes.button} rounded text-white 
         transition duration-300`}
          type="button"
          key={buttonData.text}
          onClick={onPlayButtonClick(buttonData.text)}
        >
          {buttonData.icon && (
            <img src={buttonData.icon} alt={buttonData.text} />
          )}
          <span>{buttonData.text.toLocaleUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default PlayingButtons;
