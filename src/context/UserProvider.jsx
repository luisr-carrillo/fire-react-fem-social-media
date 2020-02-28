import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapshot) => {
                    setUser({ uid: snapshot.id, ...snapshot.data() });
                });
            }
            setUser(userAuth);
        });

        return () => unsubscribe();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
