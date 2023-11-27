import { ElementRef, useEffect, useRef, useState } from "react";

import type firebase from "firebase/compat/app";
import type { FirebaseOptions } from "firebase/app";
import type firebaseui from "firebaseui";

import publicConfig from "../../firebase.public.json";

declare global {
    interface Window {
        firebaseui: typeof firebaseui;
        firebase: typeof firebase;
    }
}

const firebaseConfig: FirebaseOptions = publicConfig;

// Initialize Firebase
window.firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = window.firebase.auth();
const authUI = new window.firebaseui.auth.AuthUI(auth);

export const useUser = () => {
    const [user, setUser] = useState<firebase.User | null>(auth.currentUser);
    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);
    return user;
};

export const Login: React.FC = () => {
    const container = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        authUI.start(container.current!, {
            signInOptions: [
                window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
                window.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        });
    });

    return <div ref={container} />;
};

export const signIn = () => {
    //TODO: redirect to login page
};

export const signOut = () => {
    return auth.signOut();
};
