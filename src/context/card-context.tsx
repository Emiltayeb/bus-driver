import React, { useState, FC } from "react";
import { CardType, ColorType, SuitType } from "types/card-type";
import { Card, SUITS, VALUES } from "helpers/card-helper"
import { useGameContext } from "./game-context";

interface CardContextType {
  cardsInDeck: CardType[] | null;
  currentCard: CardType | null;
  cardsInGame: Record<number, CardType[]> | null;
  creatDeck: () => void;
  drawCard: (level: number) => void;
}

const defaultState = {

  cardsInDeck: null,
  cardsInGame: null,
  currentCard: null,
  creatDeck: () => { },
  drawCard: () => null,
};



const CardContext = React.createContext<CardContextType>(defaultState);

const CardContextProvider: FC = ({ children }) => {

  const currentCardIndex = React.useRef(0)
  const [cardsInGame, setCardsInGame] = useState<Record<number, CardType[]> | null>({});
  const [cardsInDeck, setCardsInDeck] = useState<null | CardType[]>(null);
  const [currentCard, setCurrentCard] = React.useState<CardType | null>(null)


  // React.useEffect(() => {
  //   // FIXME why this being called twice?
  //   setCardsInGame((prevCardsInGame: any) => {
  //     if (prevCardsInGame.length === 0) {
  //       return [[currentCard]]
  //     }
  //     const updatedCardsInGame = [...prevCardsInGame];
  //     updatedCardsInGame[level - 1].push(currentCard)
  //     return updatedCardsInGame

  //   })
  // }, [currentCard])
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

      setCardsInGame((prevCards: any) => {
        if (level === 1) {
          const updated = prevCards[1]?.length ? [...prevCards[1], nextCard] : [nextCard];
          return {
            1: updated,
          }
        } else {
          return {
            ...prevCards,
            [level]: nextCard
          }
        }
      })
    }



  }

  const updateCardInGame = (level: number, nextCard: CardType) => {

  }


  return (
    <CardContext.Provider
      value={{
        cardsInDeck,
        creatDeck,
        drawCard,
        currentCard,
        cardsInGame,
      }}
    >    {children}
    </CardContext.Provider>
  );
};

export const useCardsContext = () => React.useContext(CardContext);

export default CardContextProvider;
