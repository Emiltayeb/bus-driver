import { CardType } from 'types/card-type';
import { UserChoiceOptions } from 'types/rule-validator-type';

export enum Levels {
  RED_BLACK,
  ABOVE_BELOW,
  INSIDE_OUTSIDE,
  RED_BLACK_FINAL
}
type CardsInGame = Array<CardType[]>;

type ValidateLevelType = {
  level: number;
  cardsInGame: CardsInGame;
  userChoice: UserChoiceOptions;
};

//cards per level
type AboveOrBelowCards = {
  redOrBlackLastCard: CardType;
  currentCard: CardType;
};
type InsideOrOutsideCards = {
  redOrBlackLastCard: CardType;
  aboveOrBelowLastCard: CardType;
  currentCard: CardType;
};

// helpers
const formattedValues: Record<string, string> = {
  J: '11',
  Q: '12',
  K: '13',
  A: '14'
};

const formatCard = (card: CardType) => {
  if (['J', 'Q', 'K', 'A'].includes(card?.value?.toString())) {
    return formattedValues[card.value];
  }
  return card.value;
};

// handlers
const redOrBlackValidator = (
  userChoice: UserChoiceOptions,
  cardsForLevel: CardType
) => {
  return userChoice === cardsForLevel.color;
};

const aboveOrBelowValidator = (
  userChoice: UserChoiceOptions,
  cardsForLevel: AboveOrBelowCards
) => {
  const redOrBlackCard = parseInt(formatCard(cardsForLevel.redOrBlackLastCard));
  const drawnCardValue = parseInt(formatCard(cardsForLevel.currentCard));

  if (userChoice === 'above') {
    return drawnCardValue > redOrBlackCard;
  } else if (userChoice === 'bellow') {
    return drawnCardValue < redOrBlackCard;
  } else {
    return drawnCardValue === redOrBlackCard;
  }
};
const insideOrOutsideValidator = (
  userChoice: UserChoiceOptions,
  cardsForLevel: InsideOrOutsideCards
) => {
  let highestCard, lowestCard;
  const redOrBlackCard = parseInt(formatCard(cardsForLevel.redOrBlackLastCard));
  const aboveOrBelowCard = parseInt(
    formatCard(cardsForLevel.aboveOrBelowLastCard)
  );
  const currentCard = parseInt(formatCard(cardsForLevel.currentCard));

  highestCard =
    redOrBlackCard > aboveOrBelowCard ? redOrBlackCard : aboveOrBelowCard;

  lowestCard =
    highestCard === redOrBlackCard ? aboveOrBelowCard : redOrBlackCard;

  if (userChoice === 'outside') {
    return currentCard > highestCard || currentCard < lowestCard;
  } else if (userChoice === 'inside') {
    return currentCard < highestCard && currentCard > lowestCard;
  } else {
    return currentCard === redOrBlackCard || currentCard === aboveOrBelowCard;
  }
};

const getCardForLevel = (cardsInGame: CardType[][], level: number) => {
  if (!cardsInGame[level]) return;

  const currentCard = cardsInGame[level][cardsInGame[level]?.length - 1];
  switch (level) {
    case Levels.RED_BLACK:
      return currentCard;
    default:
    case Levels.ABOVE_BELOW: {
      const redOrBlackLastCard =
        cardsInGame[Levels.RED_BLACK][cardsInGame[Levels.RED_BLACK].length - 1];
      return { redOrBlackLastCard, currentCard };
    }
    case Levels.INSIDE_OUTSIDE: {
      const redOrBlackLastCard =
        cardsInGame[Levels.RED_BLACK][cardsInGame[Levels.RED_BLACK].length - 1];
      const aboveOrBelowLastCard =
        cardsInGame[Levels.ABOVE_BELOW][
          cardsInGame[Levels.ABOVE_BELOW].length - 1
        ];
      return {
        redOrBlackLastCard,
        aboveOrBelowLastCard,
        currentCard
      };
    }
    case Levels.RED_BLACK_FINAL: {
      return currentCard;
    }
  }
};
export function validateLevel({
  level,
  userChoice,
  cardsInGame
}: ValidateLevelType) {
  const cardForLevel = getCardForLevel(cardsInGame, level);
  if (!cardForLevel) return false;
  if (level === Levels.RED_BLACK || level === Levels.RED_BLACK_FINAL) {
    return redOrBlackValidator(userChoice, cardForLevel as CardType);
  }
  if (level === Levels.ABOVE_BELOW) {
    return aboveOrBelowValidator(userChoice, cardForLevel as AboveOrBelowCards);
  }
  if (level === Levels.INSIDE_OUTSIDE) {
    return insideOrOutsideValidator(
      userChoice,
      cardForLevel as InsideOrOutsideCards
    );
  }
  return false;
}
