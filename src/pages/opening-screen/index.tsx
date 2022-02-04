import { useGameContext } from 'context/game-context';
import gameDefaults from 'config/gameConfig';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './opening-screen.module.scss';
import AnimatedPage from 'components/animatePages';
import '../../styles/main.scss';
import { useModalContext } from 'context/modal.context';
import HowToPlay from 'components/how-to-play';
import TopPlayers from 'components/top-players/intex';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const OpeningScreen = function () {
 const { resetGame } = useGameContext();
 const { openModal } = useModalContext();
 const [user, loading] = useAuthState(auth);

 React.useEffect(() => {
  resetGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const withUser = (
  <div className={classes.LoginOptions}>
   <Link to="/game" className="bg-white  px-7 py-2  font-bold rounded-full">
    Play
   </Link>
   <button
    className="bg-white  px-7 py-2  font-bold rounded-full"
    onClick={() => signOut(auth)}
   >
    Sign out
   </button>
  </div>
 );

 const noUser = (
  <div className={classes.LoginOptions}>
   <Link to="/game" className="bg-white  px-7 py-2  font-bold rounded-full">
    Play as guest
   </Link>

   <Link to="/signIn" className="bg-white  px-7 py-2  font-bold rounded-full">
    Login
   </Link>
  </div>
 );

 return (
  <AnimatedPage className={`container mx-auto px-4 ${classes.Root}`}>
   {/* Rest */}
   {user && (
    <div className="flex items-center justify-center gap-3">
     <img
      src={user.photoURL as string}
      className="rounded-full max-h-10"
      alt="Profile"
     />
     <h2 className="text-white">{user.displayName}</h2>
    </div>
   )}
   <h1 className="text-white font-bold text-4xl md:text-6xl">
    {gameDefaults.name}
   </h1>

   {loading ? (
    <span className="text-white">Loading Sign in methods..</span>
   ) : user ? (
    withUser
   ) : (
    noUser
   )}
   <button
    className="bg-white  px-7 py-2 rounded-full "
    onClick={() =>
     openModal({ title: 'How To Play', component: <TopPlayers /> })
    }
   >
    Leader Board
   </button>
   <button
    onClick={() =>
     openModal({ title: 'How To Play', component: <HowToPlay /> })
    }
    className="bg-white  px-7 py-2 rounded-full "
   >
    How To Play?
   </button>
  </AnimatedPage>
 );
};

export default OpeningScreen;
