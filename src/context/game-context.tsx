import * as React from 'react';
import gameDefaults from 'config/gameConfig';
import { DELAY_BETWEEN_LOST_LEVEL } from 'config/layout';
import { useCardsContext } from './card-context';

interface GameContextInterface {
 isWonGame: boolean;
 isLostGame: boolean;
 level: number;
 handelWinLevel: () => void;
 handelLoseLevel: () => void;
 resetGame: () => void;
 currentLostLevel: number | null;
 setLevel: React.Dispatch<React.SetStateAction<number>>;
 gameScore: number | null;
 currentGameTime: number;
 resetStopWatch: () => void;
 isStopWatchActive: boolean;
 setCurrentGameTime: React.Dispatch<React.SetStateAction<number>>;
 setIsStopWatchActive: React.Dispatch<React.SetStateAction<boolean>>;
 setGameScore: React.Dispatch<React.SetStateAction<number | null>>;
 topPlayers: Record<string, number>[];
 setTopPlayers: React.Dispatch<React.SetStateAction<Record<string, number>[]>>;
}

const GameContext = React.createContext<GameContextInterface>({
 level: 0,
 setLevel: () => {},
 resetGame: () => {},
 handelWinLevel: () => {},
 handelLoseLevel: () => {},
 isWonGame: false,
 isLostGame: false,
 currentLostLevel: null,
 gameScore: null,
 currentGameTime: 0,
 resetStopWatch: () => {},
 isStopWatchActive: false,
 setCurrentGameTime: () => {},
 setIsStopWatchActive: () => {},
 setGameScore: () => {},
 topPlayers: [],
 setTopPlayers: () => {}
});

const GameContextProvider: React.FC = ({ children }) => {
 const { setCardsInGame, creatDeck, cardsInDeck } = useCardsContext();
 const [level, setLevel] = React.useState(0);
 const [currentLostLevel, setLostLevel] = React.useState<number | null>(null);
 const [isWonGame, setIsWonGame] = React.useState(false);
 const [isLostGame, setIsLostGame] = React.useState(false);
 const [gameScore, setGameScore] = React.useState<number | null>(null);
 //  stop watch
 const [isStopWatchActive, setIsStopWatchActive] = React.useState(false);
 const [currentGameTime, setCurrentGameTime] = React.useState(0);
 const [topPlayers, setTopPlayers] = React.useState<Record<string, number>[]>([]);

 // win or lose - here we need to cac score

 React.useEffect(() => {
  if (!cardsInDeck) return;
  cardsInDeck?.length === 0 && setIsLostGame(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [cardsInDeck]);

 const resetStopWatch = () => {
  setCurrentGameTime(0);
  setIsStopWatchActive(true);
 };

 const handelWinLevel = function () {
  //  level + 1 because we start our level as 0 to give a better access to arrays.
  const isWonGame = level + 1 === gameDefaults.totalLevels;
  if (isWonGame) {
   setIsWonGame(true);
   return;
  }
  setLevel((prevLevel) => (prevLevel += 1));
 };

 const handelLoseLevel = function () {
  // return on first level
  if (level === 0) return;
  setLostLevel(level);

  //revert to first level on losing each level after first.
  setTimeout(() => {
   setLevel(0);
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
    gameScore,
    isStopWatchActive,
    currentGameTime,
    resetStopWatch,
    setCurrentGameTime,
    setIsStopWatchActive,
    setGameScore,
    topPlayers,
    setTopPlayers
   }}
  >
   {children}
  </GameContext.Provider>
 );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
