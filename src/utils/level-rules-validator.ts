import { CardType } from 'types/card-type';
import { UserChoiceOptions } from 'types/rule-validator-type';
import { AboveOrBelowCards, formatCard, InsideOrOutsideCards, Levels, ValidateLevelType } from 'utils/card-helper';

// Level - 1
const redOrBlackValidator = (userChoice: UserChoiceOptions, cardsForLevel: CardType) => {
 return userChoice === cardsForLevel.color;
};

// Level - 2
const aboveOrBelowValidator = (userChoice: UserChoiceOptions, cardsForLevel: AboveOrBelowCards, setIsWonGame: any) => {
 const redOrBlackCard = parseInt(formatCard(cardsForLevel.redOrBlackLastCard));
 const drawnCardValue = parseInt(formatCard(cardsForLevel.currentCard));

 if (userChoice === 'above') {
  return drawnCardValue > redOrBlackCard;
 } else if (userChoice === 'bellow') {
  return drawnCardValue < redOrBlackCard;
 } else {
  setIsWonGame(true);
  return drawnCardValue === redOrBlackCard;
 }
};

// Level - 3
const insideOrOutsideValidator = (
 userChoice: UserChoiceOptions,
 cardsForLevel: InsideOrOutsideCards,
 setIsWonGame: any
) => {
 let highestCard, lowestCard;
 const redOrBlackCard = parseInt(formatCard(cardsForLevel.redOrBlackLastCard));
 const aboveOrBelowCard = parseInt(formatCard(cardsForLevel.aboveOrBelowLastCard));
 const currentCard = parseInt(formatCard(cardsForLevel.currentCard));

 highestCard = redOrBlackCard > aboveOrBelowCard ? redOrBlackCard : aboveOrBelowCard;

 lowestCard = highestCard === redOrBlackCard ? aboveOrBelowCard : redOrBlackCard;

 if (userChoice === 'outside') {
  return currentCard > highestCard || currentCard < lowestCard;
 } else if (userChoice === 'inside') {
  return currentCard < highestCard && currentCard > lowestCard;
 } else {
  setIsWonGame(true);
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
   const redOrBlackLastCard = cardsInGame[Levels.RED_BLACK][cardsInGame[Levels.RED_BLACK].length - 1];
   return { redOrBlackLastCard, currentCard };
  }
  case Levels.INSIDE_OUTSIDE: {
   const redOrBlackLastCard = cardsInGame[Levels.RED_BLACK][cardsInGame[Levels.RED_BLACK].length - 1];
   const aboveOrBelowLastCard = cardsInGame[Levels.ABOVE_BELOW][cardsInGame[Levels.ABOVE_BELOW].length - 1];
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
export function validateLevel({ level, userChoice, cardsInGame, setIsWonGame }: ValidateLevelType) {
 const cardForLevel = getCardForLevel(cardsInGame, level);
 if (!cardForLevel) return false;

 if (level === Levels.RED_BLACK || level === Levels.RED_BLACK_FINAL) {
  return redOrBlackValidator(userChoice, cardForLevel as CardType);
 }
 if (level === Levels.ABOVE_BELOW) {
  return aboveOrBelowValidator(userChoice, cardForLevel as AboveOrBelowCards, setIsWonGame);
 }
 if (level === Levels.INSIDE_OUTSIDE) {
  return insideOrOutsideValidator(userChoice, cardForLevel as InsideOrOutsideCards, setIsWonGame);
 }
 return false;
}
