import * as CardTypes from 'types/card-type';
import { UserChoiceOptions } from 'types/rule-validator-type';

export const SUITS: Array<CardTypes.SuitType> = ['♠', '♥', '♦', '♣'];
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export enum Levels {
 RED_BLACK,
 ABOVE_BELOW,
 INSIDE_OUTSIDE,
 RED_BLACK_FINAL
}

export type CardsInGame = Array<CardTypes.CardType[]>;

export type ValidateLevelType = {
 level: number;
 cardsInGame: CardsInGame;
 userChoice: UserChoiceOptions;
};

//cards per level
export type AboveOrBelowCards = {
 redOrBlackLastCard: CardTypes.CardType;
 currentCard: CardTypes.CardType;
};
export type InsideOrOutsideCards = {
 redOrBlackLastCard: CardTypes.CardType;
 aboveOrBelowLastCard: CardTypes.CardType;
 currentCard: CardTypes.CardType;
};
const formatHighCardValues: Record<string, string> = {
 J: '11',
 Q: '12',
 K: '13',
 A: '14'
};

// Format Face Cards
// get teh value for face cards
export const formatCard = (card: CardTypes.CardType) => {
 if (['J', 'Q', 'K', 'A'].includes(card?.value?.toString())) {
  return formatHighCardValues[card.value];
 }
 return card.value;
};

// create individual card
export class Card {
 constructor(public suit: CardTypes.SuitType, public value: string, public color: CardTypes.ColorType) {
  this.suit = suit;
  this.value = value;
  this.color = color;
 }
}
// creat card eck
class CardDeckHandler {
 currentCardIndex: number = 0;
 currentCard: CardTypes.CardType | null = null;
 cardDeck: CardTypes.CardType[] = [];

 creatDeck() {
  this.cardDeck = SUITS.map((suit: CardTypes.SuitType) =>
   VALUES.map((value: string) => {
    let color: CardTypes.ColorType | null = null;
    if (suit === '♥' || suit === '♦') {
     color = 'red';
    } else {
     color = 'black';
    }
    return new Card(suit, value, color);
   })
  ).flat();
  this.shuffle();

  return this.cardDeck;
 }

 // Todo: Improve Shuffle

 shuffle() {
  this.cardDeck = this.cardDeck.sort(() => Math.random() - 0.5);
 }

 drawCard() {
  const nextCard = this.cardDeck[this.currentCardIndex];
  this.cardDeck.splice(this.currentCardIndex, 1);
  this.currentCardIndex++;
  this.currentCard = nextCard;
  return nextCard;
 }
}

export default new CardDeckHandler();
