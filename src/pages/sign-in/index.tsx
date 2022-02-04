// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './sign-in.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookAuthProvider } from 'firebase/auth';

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

 const navigate = useNavigate();

 React.useEffect(() => {
  if (!user) return;
  navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [user]);
 return (
  <div className={classes.Root}>
   {user === null && (
    <>
     <h1 className="text-white text-xl">Choose On Of Following Methods</h1>
     <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </>
   )}

   <Link to="/" className="text-white text-sm">
    Back to home
   </Link>
  </div>
 );
}

export default SignInScreen;
