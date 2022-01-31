// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import classes from './sign-in.module.scss';
import { Link } from 'react-router-dom';

// TODO:  if you allow email and password - make sure to daa (allready have an acoount?..)

// Configure FirebaseUI.
const uiConfig = {
 signInFlow: 'popup',
 signInOptions: [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID
 ],
 callbacks: {
  signInSuccessWithAuthResult: () => false
 }
};

function SignInScreen() {
 const [user] = useAuthState(auth);
 const navigate = useNavigate();
 React.useEffect(() => {
  if (user) {
   navigate('/game');
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [user]);

 return (
  <div className={classes.Root}>
   <h1 className="text-white text-xl">Choose On Of Following Methods</h1>
   {user === null && (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
   )}
   <Link to="/" className="text-white text-xl">
    Back to home
   </Link>
  </div>
 );
}

export default SignInScreen;
