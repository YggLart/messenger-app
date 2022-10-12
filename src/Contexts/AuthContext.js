import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

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
        const credential = GoogleAuthProvider.credentialFromError(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
      });
  };

  const signInFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // TODO: link facebook account to user
        const data = error.customData;
        const email = data.email;
        const result = data._tokenResponse;
        const verifiedProvider = result.verifiedProvider;

        if (verifiedProvider[0] === "google.com") {
          var NewGoogleProvider = new GoogleAuthProvider().setCustomParameters({
            login_hint: email,
          });
          signInWithPopup(auth, NewGoogleProvider).then((res) => {
            console.log(res);
            const user = res.user;
            const credential = FacebookAuthProvider.credentialFromResult(res);
            linkWithCredential(user, credential);
          });
        }

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
