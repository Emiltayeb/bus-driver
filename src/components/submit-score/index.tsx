import TopPlayers from 'components/top-players/intex';
import { useGameContext } from 'context/game-context';
import { useModalContext } from 'context/modal.context';
import { db } from 'firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import classes from './submit-score.module.scss';

enum LoadingStatus {
 LOADING,
 INITIAL,
 COMPLETED,
 ERROR
}
const getMEssage = function getMEssage(
 status: number,
 name: string,
 gameScore: number | null,
 resetGame: () => void,
 closeModal: () => void,
 openModal: ({ title, component, open, onOpen, onClose }: any) => void
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
     <button
      onClick={() => {
       closeModal();
       resetGame();
      }}
     >
      Replay?
     </button>
    </>
   );
  case LoadingStatus.COMPLETED: {
   console.log('saved..');
   return (
    <>
     <span>
      <p className={classes.Success}> Score saved! </p>go ahead and play again
     </span>
     <div className={classes.ActionButtons}>
      <button
       onClick={() => {
        closeModal();
        resetGame();
       }}
      >
       {' '}
       Replay?
      </button>

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
   return (
    <input
     type="submit"
     className={classes.SubmitButton}
     value="Submit"
     disabled={name.length === 0 || !gameScore}
    />
   );
 }
};

const SubmitScore = () => {
 const { gameScore, setGameScore, resetGame } = useGameContext();
 const [loading, setLoading] = React.useState(LoadingStatus.INITIAL);
 const [name, setName] = React.useState('');
 const nameInputRef = React.useRef<HTMLInputElement | null>(null);
 const { closeModal, openModal } = useModalContext();

 const handelSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(LoadingStatus.LOADING);
  const colRef = collection(db, 'players');
  addDoc(colRef, {
   name,
   score: gameScore
  })
   .then(() => {
    setGameScore(null);
    setLoading(LoadingStatus.COMPLETED);
   })
   .catch(() => {
    setLoading(LoadingStatus.ERROR);
   });
 };

 React.useEffect(() => {
  if (!nameInputRef.current) return;
  nameInputRef.current.focus();
 }, [nameInputRef]);

 return (
  <form onSubmit={handelSubmit} className={classes.Root}>
   {gameScore && (
    <>
     <fieldset className={classes.Field}>
      <label htmlFor="name">Score:</label> <span>{gameScore}</span>
     </fieldset>
     <fieldset className={classes.Field}>
      <label htmlFor="name">Name:</label>
      <input
       ref={nameInputRef}
       maxLength={12}
       type="text"
       onChange={(e) => setName(e.target.value)}
       className="text-black"
      />
     </fieldset>
    </>
   )}
   {getMEssage(loading, name, gameScore, resetGame, closeModal, openModal)}
  </form>
 );
};

export default SubmitScore;
