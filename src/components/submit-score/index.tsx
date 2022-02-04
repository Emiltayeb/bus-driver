import TopPlayers from 'components/top-players/intex';
import { useGameContext } from 'context/game-context';
import { useModalContext } from 'context/modal.context';
import { StopWatchState, useStopWatchContext } from 'context/stop-watch';
import { auth, db } from 'firebase-config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './submit-score.module.scss';

enum LoadingStatus {
 LOADING,
 INITIAL,
 COMPLETED,
 ERROR
}
const getMEssage = function getMEssage(
 status: number,
 gameScore: number | null,
 openModal: ({ title, component, open, onOpen, onClose }: any) => void,
 onReplayClick: () => void
) {
 switch (status) {
  case LoadingStatus.LOADING:
   return <span>Submitting...</span>;
  case LoadingStatus.ERROR:
   return (
    <>
     <span className={classes.Error}>
      Sorry, result wasn't save. try again later.
     </span>
     <button onClick={onReplayClick}>Replay?</button>
    </>
   );
  case LoadingStatus.COMPLETED: {
   return (
    <>
     <span>
      <p className={classes.Success}> Score saved! </p>go ahead and play again
     </span>
     <div className={classes.ActionButtons}>
      <button onClick={onReplayClick}>Replay?</button>

      <button
       onClick={() => {
        openModal({ title: 'How To Play', component: <TopPlayers /> });
       }}
      >
       Top Players
      </button>
     </div>
    </>
   );
  }
  default:
   break;
 }
};

const SubmitScore = () => {
 const { gameScore, setGameScore, resetGame, topPlayers } = useGameContext();
 const { setStopWatchState } = useStopWatchContext();
 const [user] = useAuthState(auth);
 const [loading, setLoading] = React.useState(LoadingStatus.INITIAL);
 const { closeModal, openModal } = useModalContext();

 const submitScore = async function () {
  setLoading(LoadingStatus.LOADING);
  const colRef = collection(db, 'players');
  const currentPlayer = topPlayers.find(
   (player) => player.name === user?.displayName
  );

  try {
   if (currentPlayer) {
    const updateDocREf = doc(db, 'players', currentPlayer.id);
    await updateDoc(updateDocREf, {
     score: gameScore
    });
    setLoading(LoadingStatus.COMPLETED);
   } else {
    addDoc(colRef, {
     name: user?.displayName,
     score: gameScore
    });
    setLoading(LoadingStatus.COMPLETED);
   }
  } catch (error) {
   setLoading(LoadingStatus.ERROR);
  } finally {
   setGameScore(null);
  }
 };

 const onReplayClick = () => {
  closeModal();
  resetGame();
  setStopWatchState(StopWatchState.RESET);
 };

 React.useEffect(() => {
  submitScore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div className={classes.Root}>
   {getMEssage(loading, gameScore, openModal, onReplayClick)}
  </div>
 );
};

export default SubmitScore;
