// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './sign-in.module.scss';
import { Link } from 'react-router-dom';
import { FacebookAuthProvider, signOut } from 'firebase/auth';

// TODO:  if you allow email and password - make sure to daa (allready have an acoount?..)

// Configure FirebaseUI.
const uiConfig = {
 signInFlow: 'popup',
 signInOptions: [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider.PROVIDER_ID
 ],
 callbacks: {
  signInSuccessWithAuthResult: () => false
 }
};

function SignInScreen() {
 const [user] = useAuthState(auth);
 return (
  <div className={classes.Root}>
   {user === null && (
    <>
     <h1 className="text-white text-xl">Choose On Of Following Methods</h1>
     <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
   )}

   {user ? (
    <div className="text-white text-center flex flex-col items-center justify-center">
     <img
      src={user.photoURL as string}
      className="rounded-full mb-2"
      alt="User Profile"
     />
     <h1 className="md:text-4xl text-3xl mb-2">Hey {user.displayName}</h1>
     <div className="w-full flex gap-4">
      <Link to="/game" className={classes.StartGame}>
       Start Game
      </Link>
      <button className={classes.SwitchAccount} onClick={() => signOut(auth)}>
       Switch Account
      </button>
     </div>
    </div>
   ) : (
    <Link to="/" className="text-white text-sm">
     Back to home
    </Link>
   )}
  </div>
 );
}

export default SignInScreen;
