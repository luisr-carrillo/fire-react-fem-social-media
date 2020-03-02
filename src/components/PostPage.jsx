import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import withUser from './withUser';

const PostPage = ({ match, user }) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const getPostId = useCallback(() => match.params.id, [match]);
    const getPostRef = useCallback(
        () => firestore.doc(`posts/${getPostId()}`),
        [getPostId]
    );
    const getCommentsRef = useCallback(
        () => getPostRef().collection('comments'),
        [getPostRef]
    );

    const createComment = (comment) => {
        getCommentsRef().add({ comment, user, createdAt: new Date() });
    };

    useEffect(() => {
        const unsubPost = getPostRef().onSnapshot((snapshot) => {
            const firebasePost = collectIdsAndDocs(snapshot);
            setPost(firebasePost);
        });
        const unsubComments = getCommentsRef().onSnapshot((snapshot) => {
            const firebaseComments = snapshot.docs.map(collectIdsAndDocs);
            setComments(firebaseComments);
        });
        return () => {
            unsubPost();
            unsubComments();
        };
    }, [getPostRef, getCommentsRef]);

    return (
        <section>
            {post && <Post {...post} />}
            <Comments
                comments={comments}
                postId={post}
                onCreate={createComment}
            />
        </section>
    );
};

export default withRouter(withUser(PostPage));
