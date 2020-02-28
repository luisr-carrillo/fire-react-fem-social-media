import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { UserContext } from '../context/UserProvider';

const Authentication = ({ loading }) => {
    const user = useContext(UserContext);
    if (loading) return null;

    return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
