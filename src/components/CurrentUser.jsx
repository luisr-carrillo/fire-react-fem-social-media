import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { auth } from '../firebase';

const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => (
    <section className="CurrentUser">
        <div className="CurrentUser--profile">
            {photoURL && <img src={photoURL} alt={displayName} />}
            <div className="CurrentUser--information">
                <Link to="/profile">
                    <h2>{displayName}</h2>
                </Link>
                <p className="email">{email}</p>
                <p className="created-at">{moment(createdAt).calendar()}</p>
            </div>
        </div>
        <div>
            <div>{children}</div>
            <button type="button" onClick={() => auth.signOut()}>
                Sign Out
            </button>
        </div>
    </section>
);

export default CurrentUser;
