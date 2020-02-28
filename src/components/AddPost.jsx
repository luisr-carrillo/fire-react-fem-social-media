import React, { useContext } from 'react';
import useFormFields from '../hooks/useFormFields';
import { firestore } from '../firebase';
import { UserContext } from '../context/UserProvider';

const AddPost = () => {
    const user = useContext(UserContext);
    const [newPostFields, setNewPostFields] = useFormFields({
        title: '',
        content: '',
    });
    const { uid, displayName, email, photoURL } = user || {};
    const { title, content } = newPostFields;

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            title,
            content,
            favorites: 0,
            comments: 0,
            user: {
                uid,
                displayName,
                email,
                photoURL,
            },
            createdAt: new Date(),
        };

        firestore.collection('posts').add(post);
        setNewPostFields();
    };

    return (
        <form onSubmit={handleSubmit} className="AddPost">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={setNewPostFields}
            />
            <input
                type="text"
                name="content"
                placeholder="Body"
                value={content}
                onChange={setNewPostFields}
            />
            <input className="create" type="submit" value="Create Post" />
        </form>
    );
};

export default AddPost;
