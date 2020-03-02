import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: 'AIzaSyBfia4sh3vu7Kfb3eVc3eQTtLkfavA7iRY',
    authDomain: 'react-fem-firebase.firebaseapp.com',
    databaseURL: 'https://react-fem-firebase.firebaseio.com',
    projectId: 'react-fem-firebase',
    storageBucket: 'react-fem-firebase.appspot.com',
    messagingSenderId: '546666617826',
    appId: '1:546666617826:web:9bf00bf24cfebcd98637bb',
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getUserDocument = async (uid) => {
    if (!uid) return null;

    try {
        return firestore.collection('users').doc(uid);
    } catch (error) {
        console.error('[firebase] | getUserDocument: ', error);
    }
};

export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return null;

    // Get a reference to the place in the database
    // where a user profile might be.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch the document from that location.
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user;

        const createAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createAt,
                ...additionalData,
            });
        } catch (error) {
            console.error('[firebase] | createUserProfileDocument: ', error);
        }
    }

    return getUserDocument(user.uid);
};

window.firebase = firebase;

export default firebase;
