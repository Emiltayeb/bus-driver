import gameDefaults from 'config/gameConfig';
import * as React from 'react';
import { useCardsContext } from './card-context';
const DELAY_BETWEEN_LOST_LEVEL = 1.5;

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
  const [isWonGame, setIsWonGame] = React.useState(false);

  const handelWinLevel = function () {
    const isWonGame = level + 1 === gameDefaults.totalLevels;

    console.log('GAME CONTEXT _ WIN LEVEL');
    if (isWonGame) {
      console.log('GAME CONTEXT _  WON GAME!');
      setIsWonGame(true);
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
    }, DELAY_BETWEEN_LOST_LEVEL * 1000);
  };
  const resetGame = () => {
    setLevel(0);
    setCardsInGame([]);
    creatDeck();
    setLostLevel(null);
    setIsWonGame(false);
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
