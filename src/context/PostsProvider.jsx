import React, { useState, useEffect, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore
            .collection('posts')
            .onSnapshot((snapshot) => {
                const firebasePosts = snapshot.docs.map(collectIdsAndDocs);
                setPosts(firebasePosts);
            });
        return () => unsubscribe();
    }, []);

    return (
        <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    );
};
