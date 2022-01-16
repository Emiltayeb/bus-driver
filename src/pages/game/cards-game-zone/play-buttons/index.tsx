import { useCardsContext } from 'context/card-context';
import { useGameContext } from 'context/game-context';
import classes from './play-buttons.module.scss';
import React from 'react';
import { validateLevel } from 'helpers/level-rules-validator';
import { LevelOptionsType, UserChoiceOptions } from 'types/rule-validator-type';
import { cloneDeep } from 'lodash';
import { CardType } from 'types/card-type';

const buttonOptionsMap: { [key: number]: Partial<UserChoiceOptions>[] } = {
  0: ['red', 'black'],
  1: ['bellow', 'above', 'on'],
  2: ['inside', 'outside', 'on'],
  3: ['red', 'black'],
};

const sleep = (seconds = 0.5) =>
  new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, seconds * 1000);
  });

const PlayingButtons = function () {
  const [userChoice, setUserChoice] = React.useState<UserChoiceOptions | null>(
    null
  );
  const { level, setLevel } = useGameContext();
  const { drawCard, currentCard, cardsInGame, setCardsInGame } =
    useCardsContext();

  // we drawn card - validate choice
  React.useEffect(() => {
    if (!currentCard || !userChoice || !cardsInGame) return;
    // validate user choice
    const choiceStatus = validateLevel({ level, userChoice, cardsInGame });
    // currentCard -  is the card we should push to level 2.
    // correct answer!
    if (choiceStatus) {
      sleep().then(() =>
        setLevel((prevLevel) => (prevLevel + 1) as LevelOptionsType)
      );
    } else {
      // wrong answer
      // every other level - reset back to level 1 & clear all cards
      if (level === 0) return;
      sleep().then(() => {
        setLevel(0);
        setCardsInGame([]);
      });
    }
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  //  level changed.
  React.useEffect(() => {
    if (!currentCard || !userChoice || !cardsInGame || level === 0) return;
    currentCard.isFromPreviousLevel = true;
    // level 2
    if (level === 1) {
      // special case - take the last card from cards 1
      setCardsInGame((prevCards) => {
        const clonedPrev = cloneDeep(prevCards);
        const prevLevel1WonCard = clonedPrev[0].find(
          (card) => card.isFromPreviousLevel
        );
        clonedPrev[1] = [prevLevel1WonCard as CardType];
        return clonedPrev;
      });
    } else if (level === 2) {
      //  we should contiguously take all the cards from prev Level
      setCardsInGame((prevCards) => {
        const clonedPrev = cloneDeep(prevCards);
        clonedPrev[level] = [...clonedPrev[level - 1]];
        return clonedPrev;
      });
    } else if (level === 3) {
      setCardsInGame((prevCards) => {
        const clonedPrev = cloneDeep(prevCards);
        clonedPrev[level] = [...clonedPrev[level - 1]];
        return clonedPrev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const onPlayButtonClick = (buttonText: UserChoiceOptions) => () => {
    drawCard(level);
    setUserChoice(buttonText);
  };

  return (
    <div className={classes.Root}>
      {buttonOptionsMap[level]?.map((buttonText) => (
        <button
          data-variant={buttonText}
          className='px-5  py-2 rounded text-white 
         transition duration-300'
          type='button'
          key={buttonText}
          onClick={onPlayButtonClick(buttonText)}>
          {buttonText.toLocaleUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default PlayingButtons;
