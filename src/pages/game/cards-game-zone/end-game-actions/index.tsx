import React from 'react';
import Badge from 'components/badge';
import { motion } from 'framer-motion';
import SubmitScore from 'components/submit-score';
import { formatTime, getCardUsed } from 'utils/global';
import classes from '../card-game-zone.module.scss';
import { useModalContext } from 'context/modal.context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase-config';
import { Link } from 'react-router-dom';
import { useGameContext } from 'context/game-context';
import { useStopWatchContext } from 'context/stop-watch';

const shouldDisplayHighScore = function (
 currentUserHighScore: number | null,
 gameScore: number | null,
 isWonGame: boolean
) {
 if (!isWonGame) return { show: false, newRecord: false };
 if (currentUserHighScore && gameScore) {
  const newRecord = gameScore < currentUserHighScore;
  return { show: newRecord, newRecord: newRecord };
 }
 if (!currentUserHighScore && gameScore) {
  return { show: true, newRecord: false };
 }
 return { show: false, newRecord: false };
};

const EndGameActions = (props: any) => {
 const { openModal } = useModalContext();
 const { resetGame } = useGameContext();
 const { currentGameTime } = useStopWatchContext();
 const [user] = useAuthState(auth);

 const { isWonGame, gameScore, cardsInDeck, currentUserHighScore } = props;

 const { show: showFinalScore, newRecord } = shouldDisplayHighScore(
  currentUserHighScore,
  gameScore,
  isWonGame
 );
 return (
  <motion.div
   initial={{ opacity: 0, x: '10px' }}
   animate={{
    opacity: 1,
    y: 0
   }}
   transition={{
    duration: 0.5,
    delay: 0.5
   }}
   className={classes.CompleteGameMessage}
  >
   <h1 className={classes.Header}>
    {newRecord && user
     ? 'New High Score!'
     : isWonGame
     ? 'Well Done! '
     : 'You Lost.'}
   </h1>
   <div className={`${classes.ScoreDetails} text-xs  md:text-sm`}>
    <p>
     Calculated Score:
     <Badge classes={classes.FinalGameScore}>{gameScore}</Badge>
     <span className={classes.Calculation}>
      ({formatTime(currentGameTime)} seconds + {getCardUsed(cardsInDeck)} Card
      Used)
     </span>
    </p>
    {!newRecord && user && (
     <p>
      {' '}
      You didn't beat your current Record <Badge>{currentUserHighScore}</Badge>
     </p>
    )}
   </div>
   <div className={classes.EndGameButtons}>
    <button onClick={resetGame}>Replay?</button>
    {showFinalScore &&
     (user ? (
      <button
       onClick={() =>
        openModal({ title: 'submit score', component: <SubmitScore /> })
       }
      >
       Submit {newRecord ? 'New Record' : ' Score'}
      </button>
     ) : (
      <Link to="/signIn">Login To Save Score</Link>
     ))}
   </div>
  </motion.div>
 );
};

export default EndGameActions;
