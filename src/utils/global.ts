import { CardType } from 'types/card-type';

export const setCustomCssProperty = function (propertyName: string, value: string) {
 const root = document.documentElement;
 root.style.setProperty(propertyName, value);
};

export const formatTime = function (time: number) {
 return time / 1000;
};

export const getCardUsed = function (cardsInDeck: CardType[] | null) {
 if (!cardsInDeck) return;
 return 52 - cardsInDeck.length;
};

// Helpers to set class accordingly

enum LevelStatus {
 ACTIVE = 'Active',
 PASSED = 'Passed',
 LOSE = 'Lose'
}

export const getLevelStatus = function (
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
