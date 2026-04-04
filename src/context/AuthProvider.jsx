import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth";
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

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const changePassword = async (currentPassword, newPassword) => {
        if (!auth.currentUser) {
            throw new Error("No authenticated user found");
        }

        const providerId = auth.currentUser.providerData?.[0]?.providerId;
        if (providerId !== "password") {
            throw new Error("Password update is only available for email/password accounts.");
        }

        if (currentPassword) {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
        }

        return updatePassword(auth.currentUser, newPassword);
    };

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
        googleLogin,
        changePassword,
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
