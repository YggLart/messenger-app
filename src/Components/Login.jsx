import React from "react";
import { AiOutlineGoogle as GoogleIcon } from "react-icons/ai";
import { FaFacebookF as FacebookIcon } from "react-icons/fa";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const Login = () => {
  const auth = getAuth(app);

  const signInGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signInFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div id="login-page">
      <h2>Ygg's Messenger</h2>
      <div className="btn google" onClick={signInGoogle}>
        <GoogleIcon />
        Login with Google
      </div>
      <div className="btn facebook" onClick={signInFacebook}>
        <FacebookIcon />
        Login with Facebook
      </div>
    </div>
  );
};
