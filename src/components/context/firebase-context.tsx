import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { createContext } from "react";

type FirebaseContextType = {
    isLoaded: boolean,
    setIsLoaded: (isLoaded: boolean) => void,
    app: FirebaseApp | null,
    setApp: (app: FirebaseApp) => void
    analytics: Analytics | null,
    setAnalytics: (analytics: Analytics) => void
    auth: Auth | null,
    setAuth: (auth: Auth) => void,
    firestore: Firestore | null,
    setFirestore: (firestore: Firestore) => void,
    currentUser: User | null | undefined,
    setCurrentUser: (user: User) => void,
    userData: unknown | null,
    debug: boolean,
};

export const FirebaseContext = createContext<FirebaseContextType>({
    isLoaded: false,
    setIsLoaded: () => { },
    app: null,
    setApp: () => { },
    analytics: null,
    setAnalytics: () => { },
    auth: null,
    setAuth: () => { },
    firestore: null,
    setFirestore: () => { },
    currentUser: null,
    setCurrentUser: () => { },
    userData: null,
    debug: false,
});
