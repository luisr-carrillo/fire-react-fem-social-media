import React, { useState } from 'react';
import { auth, firestore } from '../firebase';

const UserProfile = () => {
    const [userDisplayName, setUserDisplayName] = useState('');
    const [imgInput, setImgInput] = useState(null);

    const userUid = () => auth.currentUser.uid;
    const userRef = () => firestore.doc(`users/${userUid()}`);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userDisplayName) {
            userRef().update({ displayName: userDisplayName });
        }
    };

    return (
        <section className="UserProfile">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userDisplayName}
                    name="userDisplayName"
                    onChange={(e) => setUserDisplayName(e.target.value)}
                    placeholder="Display Name"
                />
                <input type="file" ref={(ref) => setImgInput(ref)} />
                <input className="update" type="submit" />
            </form>
        </section>
    );
};
export default UserProfile;
