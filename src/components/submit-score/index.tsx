import { useGameContext } from 'context/game-context';
import { useModalContext } from 'context/modal.context';
import { auth } from 'firebase-config';
import React from 'react';
import useHttps, { HttpsStatus } from 'utils/useHttp';
import classes from './submit-score.module.scss';

const getMEssage = function (
 status: number,
 name: string,
 gameScore: number | null,
 resetGame: () => void,
 closeModal: () => void
) {
 switch (status) {
  case HttpsStatus.LOADING:
   return <span>Submitting...</span>;
  case HttpsStatus.ERROR:
   return (
    <>
     <span className={classes.Error}>Sorry, result wasn't save. try again later.</span>
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
  case HttpsStatus.COMPLETED: {
   console.log('saved..');
   return (
    <>
     <span>
      <span className={classes.Success}> Score saved! </span>
      go ahead and play again.
     </span>
     <button
      onClick={() => {
       closeModal();
       resetGame();
      }}
     >
      {' '}
      Replay?
     </button>
    </>
   );
  }
  default:
   return (
    <input type="submit" className={classes.SubmitButton} value="Submit" disabled={name.length === 0 || !gameScore} />
   );
 }
};

const SubmitScore = () => {
 const { postJson, status } = useHttps({ url: `${process.env.REACT_APP_API_ENDPOINT}` });
 const { gameScore, setGameScore, resetGame } = useGameContext();
 const [name, setName] = React.useState('');
 const nameInputRef = React.useRef<HTMLInputElement | null>(null);
 const { closeModal } = useModalContext();

 const handelSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const token = await auth.currentUser?.getIdToken();
  postJson({ auth: token }, { [name.replace(/\s/g, '_')]: gameScore });
  setGameScore(null);
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
      <label htmlFor="name">Score:</label>
      <span>{gameScore}</span>
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
   {getMEssage(status, name, gameScore, resetGame, closeModal)}
  </form>
 );
};

export default SubmitScore;
