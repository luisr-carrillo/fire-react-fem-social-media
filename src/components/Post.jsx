import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { UserContext } from '../context/UserProvider';

const Post = ({ id, title, content, user, createdAt, favorites, comments }) => {
    const authUser = useContext(UserContext);

    const postRef = firestore.doc(`posts/${id}`);
    const handleRemove = () => postRef.delete();
    const handleStar = () => postRef.update({ favorites: favorites + 1 });

    const belongsToCurrentUser = (currentUser, postAuthor) => {
        if (!currentUser) return false;
        return currentUser.uid === postAuthor.uid;
    };

    return (
        <article className="Post">
            <div className="Post--content">
                <Link to={`/post/${id}`}>
                    <h3>{title}</h3>
                </Link>
                <div>{content}</div>
            </div>
            <div className="Post--meta">
                <div>
                    <p>
                        <span role="img" aria-label="star">
                            ⭐️
                        </span>
                        {favorites}
                    </p>
                    <p>
                        <span role="img" aria-label="comments">
                            🙊
                        </span>
                        {comments}
                    </p>
                    <p>Posted by {user.displayName}</p>
                    <p>{moment(createdAt.toDate()).calendar()}</p>
                </div>
                <div>
                    <button type="button" className="star" onClick={handleStar}>
                        Star
                    </button>
                    {belongsToCurrentUser(authUser, user) && (
                        <button
                            type="button"
                            className="delete"
                            onClick={handleRemove}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Post;
