import * as React from 'react';
import gameDefaults from 'config/gameConfig';
import { DELAY_BETWEEN_LOST_LEVEL } from 'config/layout';
import { useCardsContext } from './card-context';
import { useStopWatchContext } from './stop-watch';
export type TopScore = { id: string; name: string; score: number };
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
 setGameScore: React.Dispatch<React.SetStateAction<number | null>>;
 topPlayers: TopScore[];
 setTopPlayers: React.Dispatch<React.SetStateAction<TopScore[]>>;
 setIsWonGame: React.Dispatch<React.SetStateAction<boolean>>;
 currentUserHighScore: number | null;
 setCurrentUserHighScore: React.Dispatch<React.SetStateAction<number | null>>;
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
 setGameScore: () => {},
 topPlayers: [],
 setTopPlayers: () => {},
 setIsWonGame: () => {},
 currentUserHighScore: null,
 setCurrentUserHighScore: () => {}
});

const GameContextProvider: React.FC = ({ children }) => {
 const { setCardsInGame, creatDeck, cardsInDeck } = useCardsContext();
 const { reset: resetStopWatch } = useStopWatchContext();
 const [level, setLevel] = React.useState(0);
 const [currentLostLevel, setLostLevel] = React.useState<number | null>(null);
 const [isWonGame, setIsWonGame] = React.useState(false);
 const [isLostGame, setIsLostGame] = React.useState(false);
 const [gameScore, setGameScore] = React.useState<number | null>(null);
 const [topPlayers, setTopPlayers] = React.useState<TopScore[]>([]);
 const [currentUserHighScore, setCurrentUserHighScore] = React.useState<
  number | null
 >(null);
 //  stop watch

 // win or lose - here we need to cac score

 React.useEffect(() => {
  if (!cardsInDeck) return;
  cardsInDeck?.length === 0 && setIsLostGame(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [cardsInDeck]);

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
    setGameScore,
    topPlayers,
    setTopPlayers,
    setIsWonGame,
    currentUserHighScore,
    setCurrentUserHighScore
   }}
  >
   {children}
  </GameContext.Provider>
 );
};

export const useGameContext = () => React.useContext(GameContext);

export default GameContextProvider;
