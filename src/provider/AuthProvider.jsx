import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //for create user
  const signUpWithEmail = (email, password) => {
    setLoading(false);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  //for login user
  const signInWithEmail = (email, password) => {
    setLoading(false);

    return signInWithEmailAndPassword(auth, email, password);
  };

  //for log out
  const logOut = () => {
    return signOut(auth);
  };

  //for auth state change
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  const userInfo = {
    signInWithEmail,
    signUpWithEmail,

    logOut,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
