import React, { useState, FC } from "react";
import { CardType, ColorType, SuitType } from "types/card-type";
import { Card, SUITS, VALUES } from "helpers/card-helper"
import { cloneDeep } from "lodash"



interface CardContextType {
  cardsInDeck: CardType[] | null;
  currentCard: CardType | null;
  cardsInGame: Array<CardType[]>;
  creatDeck: () => void;
  drawCard: (level: number) => void;
  setCardsInGame: React.Dispatch<React.SetStateAction<CardType[][]>>
}

const defaultState = {

  cardsInDeck: null,
  cardsInGame: [],
  currentCard: null,
  creatDeck: () => { },
  drawCard: () => null,
  setCardsInGame: () => { }
};



const CardContext = React.createContext<CardContextType>(defaultState);

const CardContextProvider: FC = ({ children }) => {

  const currentCardIndex = React.useRef(0)
  const [cardsInGame, setCardsInGame] = useState<Array<CardType[]>>([]);
  const [cardsInDeck, setCardsInDeck] = useState<null | CardType[]>(null);
  const [currentCard, setCurrentCard] = React.useState<CardType | null>(null)


  const creatDeck = function () {
    const freshDeck = SUITS.map((suit: SuitType) =>
      VALUES.map((value: string) => {
        let color: ColorType | null = null;
        if (suit === "♥" || suit === "♦") {
          color = "red";
        } else {
          color = "black";
        }
        return new Card(suit, value, color);
      })
    ).flat().sort(() => Math.random() - 0.5);;

    console.log(freshDeck.slice(0, 5));
    setCardsInDeck(freshDeck)
  }

  const drawCard = (level: number) => {
    if (cardsInDeck?.length === 0) return
    const nextCard = cardsInDeck?.[currentCardIndex.current];

    setCardsInDeck((prevCards) => {
      if (!prevCards) return prevCards
      const updatedCards = [...prevCards];
      updatedCards.splice(currentCardIndex.current, 1)
      return updatedCards
    })

    if (nextCard) {
      setCurrentCard(nextCard)

      setCardsInGame((prevCards) => {

        if (prevCards?.length) {
          const clonedPrev = cloneDeep(prevCards);
          clonedPrev[level] = [...clonedPrev[level], nextCard];
          return clonedPrev
        }

        return [[nextCard]]

      })
    }



  }


  return (
    <CardContext.Provider
      value={{
        cardsInDeck,
        creatDeck,
        drawCard,
        currentCard,
        cardsInGame,
        setCardsInGame
      }}
    >    {children}
    </CardContext.Provider>
  );
};

export const useCardsContext = () => React.useContext(CardContext);

export default CardContextProvider;
