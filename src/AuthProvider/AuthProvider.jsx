import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleSignIn = () => {
    setPageLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubSignIn = () => {
    setPageLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const emailSignUp = (email, password) => {
    setPageLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailSignIn = (email, password) => {
    setPageLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photourl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photourl,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPageLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userLogOut = () => {
    return signOut(auth);
  }

  const AuthValue = {
    googleSignIn,
    pageLoading,
    emailSignUp,
    emailSignIn,
    githubSignIn,
    updateUser,
    user,
    userLogOut
  };
  return <AuthContext value={AuthValue}>{children}</AuthContext>;
};

export default AuthProvider;
