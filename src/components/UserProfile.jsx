import React, { useState } from 'react';
import { auth, firestore, storage } from '../firebase';

const UserProfile = () => {
    const [displayNameField, setDisplayNameField] = useState('');
    const [imgInput, setImgInput] = useState(null);

    const userUid = () => auth.currentUser.uid;
    const userRef = () => firestore.doc(`users/${userUid()}`);
    const userFile = () => imgInput && imgInput.files[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (displayNameField.trim() !== '') {
            userRef().update({ displayName: displayNameField });
            setDisplayNameField('');
        }

        if (userFile()) {
            storage
                .ref()
                .child('user-profiles')
                .child(userUid())
                .child(userFile().name)
                .put(userFile())
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((photoURL) => userRef().update({ photoURL }));
        }
    };

    return (
        <section className="UserProfile">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={displayNameField}
                    name="userDisplayName"
                    onChange={(e) => setDisplayNameField(e.target.value)}
                    placeholder="Display Name"
                />
                <input type="file" ref={(ref) => setImgInput(ref)} />
                <input className="update" type="submit" />
            </form>
        </section>
    );
};
export default UserProfile;
