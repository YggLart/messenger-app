import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBncmsEczYprAcHh7gQCPMjmathvlqTLks",
  authDomain: "ygg-messenger.firebaseapp.com",
  projectId: "ygg-messenger",
  storageBucket: "ygg-messenger.appspot.com",
  messagingSenderId: "1052221032345",
  appId: "1:1052221032345:web:133b8a6aa2c24c1fdf3508",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
