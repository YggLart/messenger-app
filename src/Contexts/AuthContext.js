import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // check login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        if (user) history.push("/chats");
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [user, history]);

  // log in
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const signInGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signInFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        // const errorMessage = error.message;
        // const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  // log out
  const logout = async () => {
    await signOut(auth);
    history.push("/");
  };

  const value = { user, signInGoogle, signInFacebook, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
