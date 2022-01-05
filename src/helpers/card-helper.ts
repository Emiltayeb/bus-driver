import * as CardTypes from "types/card-type"
export const SUITS: Array<CardTypes.SuitType> = ["♠", "♥", "♦", "♣"];
export const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

export class Card {
  constructor(
    public suit: CardTypes.SuitType,
    public value: string,
    public color: CardTypes.ColorType
  ) {
    this.suit = suit;
    this.value = value;
    this.color = color;
  }
}

class CardDeckHandler {
  currentCardIndex: number = 0;
  currentCard: CardTypes.CardType | null = null;
  cardDeck: CardTypes.CardType[] = [];

  creatDeck() {
    this.cardDeck = SUITS.map((suit: CardTypes.SuitType) =>
      VALUES.map((value: string) => {
        let color: CardTypes.ColorType | null = null;
        if (suit === "♥" || suit === "♦") {
          color = "red";
        } else {
          color = "black";
        }
        return new Card(suit, value, color);
      })
    ).flat();
    this.shuffle();

    return this.cardDeck
  }

  shuffle() {
    this.cardDeck = this.cardDeck.sort(() => Math.random() - 0.5);
  }

  drawCard() {
    const nextCard = this.cardDeck[this.currentCardIndex];
    this.cardDeck.splice(this.currentCardIndex, 1)
    this.currentCardIndex++;
    this.currentCard = nextCard;
    return nextCard;
  }
}

export default new CardDeckHandler();
