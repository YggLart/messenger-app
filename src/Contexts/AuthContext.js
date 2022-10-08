import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { app } from "../firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        if (user) history.push("/chats");
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user, history]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
