
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
// @ts-ignore
import {signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebase";

const AuthContext =
    createContext({

    });

export const AuthContextProvider = (
    {children}: { children: ReactNode }
) => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // @ts-ignore
                setUser(result.user);
            }).catch((error) => {
            console.log(error);
        });
    }

    const signOutWithGoogle = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // @ts-ignore
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    } ,[
        user,
    ]);

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOutWithGoogle,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}