import gameDefaults from 'config/gameConfig';
import * as React from 'react';
import { useCardsContext } from './card-context';

interface CardContextType {
  isWonGame: boolean;
  level: number;
  handelWinLevel: () => void;
  handelLoseLevel: () => void;
  resetGame: () => void;
  currentLostLevel: number | null;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = React.createContext<CardContextType>({
  level: 1,
  setLevel: () => {},
  resetGame: () => {},
  handelWinLevel: () => {},
  handelLoseLevel: () => {},
  isWonGame: false,
  currentLostLevel: null
});

const GameContextProvider: React.FC = ({ children }) => {
  const { setCardsInGame, creatDeck } = useCardsContext();
  const [level, setLevel] = React.useState(0);
  const [currentLostLevel, setLostLevel] = React.useState<number | null>(null);
  const isWonGame = level === gameDefaults.totalLevels - 1;

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
    // set current lost level for animation
    setLostLevel(level);

    // clear lsot level
    setTimeout(() => {
      setLevel(0);
      // reset level
      setCardsInGame([]);
      setLostLevel(null);
    }, 2500);
  };
  const resetGame = () => {
    setLevel(0);
    setCardsInGame([]);
    creatDeck();
  };
  return (
    <GameContext.Provider
      value={{
        level,
        setLevel,
        resetGame,
        handelWinLevel,
        handelLoseLevel,
        isWonGame,
        currentLostLevel
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
