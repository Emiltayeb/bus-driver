import { useGameContext } from 'context/game-context';
import gameDefaults from 'config/gameConfig';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './opening-screen.module.scss';
import AnimatedPage from 'components/animatePages';

import '../../styles/main.scss';
const OpeningScreen = function () {
 const { resetGame } = useGameContext();
 React.useEffect(() => {
  resetGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 return (
  <AnimatedPage className={`container mx-auto px-4 ${classes.Root}`}>
   <h1 className="text-white font-bold text-4xl md:text-6xl">{gameDefaults.name}</h1>
   <Link to="/game" className="bg-white  px-7 py-2  font-bold rounded-full">
    Start Game
   </Link>
   <button className="bg-white  px-7 py-2 rounded-full ">Leader Board</button>
   <button className="bg-white  px-7 py-2 rounded-full ">How To Play?</button>
  </AnimatedPage>
 );
};

export default OpeningScreen;
