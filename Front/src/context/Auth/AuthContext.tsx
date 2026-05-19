import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import axios from 'axios';

// 1. Define the exact shape of your Krayaa Database User
export interface DbUser {
    _id: string;
    username: string;
    email: string;
    avatarId: string;
    reputation: number;
    reputationLevel: string;
    universityId: string; // Crucial for isolating Campus Hub features
    role: 'student' | 'volunteer' | 'representative' | 'superadmin';
}

// 2. Define the shape of your Auth State (Matching your old logic perfectly)
export interface AuthData {
    isLoggedIn: boolean;
    firebaseUser: FirebaseUser | null;
    dbUser: DbUser | null;
    hasProfile: boolean;
}

// 3. Define the Context Functions available to the rest of the app
interface AuthContextType {
    authData: AuthData;
    isLoading: boolean;
    completeProfile: () => Promise<void>;
    logoutUser: () => Promise<void>;
}

// 4. Create the Context with default empty values
export const AuthContext = createContext<AuthContextType | null>(null);

// 5. The Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>({
        isLoggedIn: false,
        firebaseUser: null,
        dbUser: null,
        hasProfile: false,
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    /* -------------------------------
       CORE AUTH LISTENER
    -------------------------------- */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setIsLoading(true);

            // 🚫 Not logged in
            if (!firebaseUser) {
                setAuthData({
                    isLoggedIn: false,
                    firebaseUser: null,
                    dbUser: null,
                    hasProfile: false,
                });
                setIsLoading(false);
                return;
            }

            try {
                const token = await firebaseUser.getIdToken(true);

                // Fetch user from MongoDB (Ensure your backend URL has /api/ included if you updated your routes!)
                const res = await axios.get(
                    `https://krayaaa.onrender.com/api/users/profile/${firebaseUser.uid}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                // ✅ Profile exists in MongoDB
                setAuthData({
                    isLoggedIn: true,
                    firebaseUser,
                    dbUser: res.data,
                    hasProfile: true,
                });

            } catch (err: any) {
                // Expected case for brand new users who just passed the domain check
                if (err.response?.status === 404) {
                    setAuthData({
                        isLoggedIn: true,
                        firebaseUser,
                        dbUser: null,
                        hasProfile: false, // Triggers your app to show the onboarding/Complete Profile screen
                    });
                } else {
                    console.error('AuthContext fatal error:', err);
                    await signOut(auth);
                    setAuthData({
                        isLoggedIn: false,
                        firebaseUser: null,
                        dbUser: null,
                        hasProfile: false,
                    });
                }
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* -------------------------------
       AFTER PROFILE CREATION
    -------------------------------- */
    // Call this function right after the user submits the onboarding form
    const completeProfile = async () => {
        const firebaseUser = auth.currentUser;
        if (!firebaseUser) return;

        try {
            const token = await firebaseUser.getIdToken(true);
            const res = await axios.get(
                `https://krayaaa.onrender.com/api/users/profile/${firebaseUser.uid}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setAuthData({
                isLoggedIn: true,
                firebaseUser,
                dbUser: res.data,
                hasProfile: true, // This will instantly redirect them into the main app
            });
        } catch (err: any) {
            if (err.response?.status === 404) {
                setAuthData({
                    isLoggedIn: true,
                    firebaseUser,
                    dbUser: null,
                    hasProfile: false,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    /* -------------------------------
       LOGOUT
    -------------------------------- */
    const logoutUser = async () => {
        await signOut(auth);
        setAuthData({
            isLoggedIn: false,
            firebaseUser: null,
            dbUser: null,
            hasProfile: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                isLoading,
                completeProfile,
                logoutUser,
            }}
        >
            {/* Prevents the app from flashing unauthenticated screens while loading */}
            {!isLoading && children}
        </AuthContext.Provider>
    );
};