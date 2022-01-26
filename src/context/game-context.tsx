import gameDefaults from 'config/gameConfig';
import * as React from 'react';
import { useCardsContext } from './card-context';
import { useStopWatchContext } from './timer-context';
const DELAY_BETWEEN_LOST_LEVEL = 1.5;

interface CardContextType {
  isWonGame: boolean;
  isLostGame: boolean;
  level: number;
  handelWinLevel: () => void;
  handelLoseLevel: () => void;
  resetGame: () => void;
  currentLostLevel: number | null;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  gameScore: number | null;
}

const GameContext = React.createContext<CardContextType>({
  level: 1,
  setLevel: () => {},
  resetGame: () => {},
  handelWinLevel: () => {},
  handelLoseLevel: () => {},
  isWonGame: false,
  isLostGame: false,
  currentLostLevel: null,
  gameScore: null
});

const GameContextProvider: React.FC = ({ children }) => {
  const { setCardsInGame, creatDeck, cardsInDeck } = useCardsContext();
  const {
    reset: resetStopWatch,
    setIsActive: setStopWatch,
    time
  } = useStopWatchContext();
  const [level, setLevel] = React.useState(0);
  const [currentLostLevel, setLostLevel] = React.useState<number | null>(null);
  const [isWonGame, setIsWonGame] = React.useState(false);
  const [isLostGame, setIsLostGame] = React.useState(false);
  const [gameScore, setGameScore] = React.useState<number | null>(null);

  // win or lose - here we need to cac score
  React.useEffect(() => {
    if (isWonGame || isLostGame) {
      setStopWatch(false);
      const currTime = time / 1000;
      const cardUsed = 52 - (cardsInDeck?.length as number);
      const finalScore = parseFloat((currTime + cardUsed).toFixed(2));
      setGameScore(finalScore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLostGame, isWonGame]);

  // user lost the game
  React.useEffect(() => {
    if (!cardsInDeck) return;
    cardsInDeck?.length === 0 && setIsLostGame(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsInDeck]);

  const handelWinLevel = function () {
    const isWonGame = level + 1 === gameDefaults.totalLevels;
    if (isWonGame) {
      setIsWonGame(true);
      return;
    }
    setLevel((prevLevel) => (prevLevel += 1));
  };

  const handelLoseLevel = function () {
    console.log('GAME CONTEXT _ LOSE LEVEL');
    // first level - nothing to do
    if (level === 0) return;

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
    resetStopWatch();
    setLevel(0);
    setCardsInGame([]);
    creatDeck();
    setLostLevel(null);
    setIsWonGame(false);
    setIsLostGame(false);
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
        isLostGame,
        currentLostLevel,
        gameScore
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
