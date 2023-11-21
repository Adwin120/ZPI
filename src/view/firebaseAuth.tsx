import firebase from "firebase/compat/app";
import firebaseui from "firebaseui";
import "firebase/compat/auth";
import type { FirebaseOptions } from "firebase/app";
import type { User } from "firebase/auth";

import { ElementRef, useEffect, useId, useRef, useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig: FirebaseOptions = {
    // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = firebase.auth();
const authUI = new firebaseui.auth.AuthUI(auth);

export const useUser = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);
    return user;
};

export const Login: React.FC = () => {
    const containerID = useId();

    useEffect(() => {
        authUI.start(containerID, {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        });
    });

    return <div id={containerID} />;
};

export const signIn = () => {
    //TODO: redirect to login page
};

export const signOut = () => {
    return auth.signOut();
};
