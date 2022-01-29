import React from 'react';
import classes from './how-to-play.module.scss';
import { ReactComponent as RedOrBlackCards } from 'assets/cards/red-or-black.svg';
import { ReactComponent as OnCards } from 'assets/cards/on-cards.svg';

const HowToPlayModal = () => {
 return (
  <div className={classes.Root}>
   <section className="mb-6">
    <h1 className="font-bold mb-1">Score:</h1>

    <p className="text-xs">Your score is calculated by the total game time + number of cards used.</p>
    <p className="text-xs">Your goal is to finish all 4 levels at the shortest time.</p>
   </section>

   <section className={classes.LevelsSection}>
    <h1 className="font-bold mb-1">Levels:</h1>
    {/* List */}

    <ol className={classes.Levels}>
     <li className={classes.Content}>
      <p className="text-xs">
       1: <span className="text-red-600">Red</span> Or Black? that's it. nothing complicated here.
      </p>
     </li>
     <li className={`${classes.CardImage} ${classes.RedOrBlackCards}`}>
      <RedOrBlackCards />
     </li>

     <li className={`${classes.Content} self-center`}>
      <p className="text-xs ">2: Above, Below or On?</p>
      <p className="text-xs ">Will the next card be higher, lower or exactly the value of the card from level 1</p>

      <p className="text-xs font-bold">Pay &hearts; choosing "on" and Guessing correctly win the game!</p>
     </li>
     <li className={`${classes.CardImage} ${classes.OnCards}`}>
      <OnCards />
     </li>

     <li className={classes.Content}>
      <p className="text-xs">3: Inside, Outside or On?</p>
      <p className="text-xs ">Will the next card be higher, lower or exactly the value of the card from level 1</p>
     </li>

     <li className={classes.Content}>
      <p className="text-xs">4: Final Red Or Black. Sounds familiar?</p>
     </li>
    </ol>
   </section>
  </div>
 );
};

export default HowToPlayModal;
