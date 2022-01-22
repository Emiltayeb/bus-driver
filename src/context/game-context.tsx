import gameDefaults from 'config/gameConfig';
import * as React from 'react';
import { useCardsContext } from './card-context';
interface CardContextType {
  isGameActive: boolean;
  isWonGame: boolean;
  level: number;
  handelWinLevel: () => void;
  handelLoseLevel: () => void;
  resetGame: () => void;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = React.createContext<CardContextType>({
  isGameActive: false,
  setIsGameActive: () => {},
  level: 1,
  setLevel: () => {},
  resetGame: () => {},
  handelWinLevel: () => {},
  handelLoseLevel: () => {},
  isWonGame: false
});

const GameContextProvider: React.FC = ({ children }) => {
  const { setCardsInGame, creatDeck } = useCardsContext();
  const [isGameActive, setIsGameActive] = React.useState(false);
  const [level, setLevel] = React.useState(0);
  const isWonGame = level === gameDefaults.totalLevels;

  const handelWinLevel = function () {
    console.log('GAME CONTEXT _ WIN LEVEL');
    if (isWonGame) {
      console.log('GAME CONTEXT _  WON GAME!');
      return;
    }
    setLevel((prevLevel) => (prevLevel += 1));
  };

  const handelLoseLevel = function () {
    console.log('GAME CONTEXT _ LOSE LEVEL');
    // first level - nothing to do
    if (level === 0) return;
    // clear cards on the board
    setCardsInGame([]);
    // reset level
    setLevel(0);
  };
  const resetGame = () => {
    setLevel(0);
    creatDeck();
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
        handelLoseLevel,
        isWonGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
