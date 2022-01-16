import { useGameContext } from 'context/game-context';
import React from 'react';

const OpeningScreen = function () {
  const { setIsGameActive } = useGameContext();

  return (
    <div className='container mx-auto px-4 '>
      <h1
        className='text-primary font-bold text-3xl
     
      md:text-6xl'>
        Bus Driver!
      </h1>
      <button
        className='bg-blue-700  px-7 py-2 rounded text-white 
         transition duration-300'
        onClick={() => setIsGameActive(true)}>
        Start Game
      </button>
    </div>
  );
};

export default OpeningScreen;
