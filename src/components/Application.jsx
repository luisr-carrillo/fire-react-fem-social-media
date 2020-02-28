import React, { useState, useEffect } from 'react';
import { firestore, auth, createUserProfileDocument } from '../firebase';
import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

const Application = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        firestore.collection('posts').onSnapshot((snapshot) => {
            const firebasePosts = snapshot.docs.map(collectIdsAndDocs);
            setPosts(firebasePosts);
        });
    }, []);

    useEffect(() => {
        const authUser = async () => {
            auth.onAuthStateChanged(async (userAuth) => {
                const createdUser = await createUserProfileDocument(userAuth);
                setUser(createdUser);
            });
        };
        authUser();
    }, []);

    return (
        <main className="Application">
            <h1>Think Piece</h1>
            <Authentication user={user} />
            <Posts posts={posts} />
        </main>
    );
};

export default Application;
