import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../services/firebase.config.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [themeController, setThemeController] = useState('dark');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submissionLoader, setSubmissionLoader] = useState(false);

    const createUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            subscriber();
        }
    }, [])    

    const authInfo = {
        createUser,
        updateUserProfile,
        login,
        user,
        setUser,
        logOut,
        loading,
        setLoading,
        themeController,
        setThemeController,
        submissionLoader,
        setSubmissionLoader
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;