const functions = require('firebase-functions');
const admin = require('firebase-admin');

// const serviceAccount = require('../serviceAccountKey.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://react-fem-firebase.firebaseio.com',
// });

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

exports.getAllPost = functions.https.onRequest(async (req, res) => {
    const snapshot = await firestore.collection('posts').get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({ posts });
});

exports.sanitizeContent = functions.firestore
    .document('posts/{postId}')
    .onWrite(async (change) => {
        if (!change.after.exists) return null;

        const { content, sanitized } = change.after.data();

        if (content && !sanitized) {
            return change.after.ref.update({
                content: content.replace(/CoffeScript/g, '**********'),
                sanitized: true,
            });
        }
    });

exports.incrementCommentCount = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onCreate(async (snapshot, context) => {
        const { postId } = context.params;
        const postRef = firestore.doc(`posts/${postId}`);

        const snap = await postRef.get('comments');
        const comments = snap.get('comments');

        return postRef.update({ comments: comments + 1 });
    });
