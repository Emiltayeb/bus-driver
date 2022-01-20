import gameDefaults from 'config/gameConfig';
import * as React from 'react';
import { useCardsContext } from './card-context';
interface CardContextType {
  isGameActive: boolean;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handelWinLevel: any;
  handelLoseLevel?: any;
  resetGame: () => void;
}

const GameContext = React.createContext<CardContextType>({
  isGameActive: false,
  setIsGameActive: () => {},
  level: 1,
  setLevel: () => {},
  resetGame: () => {},
  handelWinLevel: () => {},
  handelLoseLevel: () => {}
});

const GameContextProvider: React.FC = ({ children }) => {
  const { setCardsInGame, creatDeck } = useCardsContext();
  const [isGameActive, setIsGameActive] = React.useState(false);
  const [level, setLevel] = React.useState(0);

  const handelWinLevel = function (currentCard: any, cardsInGame: any) {
    console.log('GAME CONTEXT _ WIN LEVEL');
    switch (level) {
      case 1:
        // won firs level ;
        break;

      default:
        break;
    }

    if (level === gameDefaults.totalLevels - 1) {
      console.log('WON GAME!');
      return;
    }
    setLevel((prevLevel) => (prevLevel += 1));
  };

  const handelLoseLevel = function (currentCard: any, cardsInGame: any) {
    console.log('GAME CONTEXT _ LOSE LEVEL');
    // first level - nothing to do
    if (level === 0) return;
    // reset deck
    creatDeck();
    // reset cards in game
    setCardsInGame([]);
    // reset level
    setLevel(0);
  };
  const resetGame = () => {
    setLevel(0);
  };
  return (
    <GameContext.Provider
      value={{
        isGameActive: isGameActive,
        level,
        setIsGameActive,
        setLevel,
        resetGame,
        handelWinLevel,
        handelLoseLevel
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
