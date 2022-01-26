import { CardType } from 'types/card-type';

export const setCustomCssProperty = function (
  propertyName: string,
  value: string
) {
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
