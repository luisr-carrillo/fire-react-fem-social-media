import React from 'react';
import useFormFields from '../hooks/useFormFields';
import { auth, signInWithGoogle } from '../firebase';

const SignIn = () => {
    const [loginFields, setLoginFields] = useFormFields({
        email: '',
        password: '',
    });
    const { email, password } = loginFields;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await auth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('[SignIn] | result: ', result);
            })
            .catch((error) => {
                console.error('[SignIn] | error: ', error);
            });
        setLoginFields();
    };

    return (
        <form className="SignIn" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={setLoginFields}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={setLoginFields}
                autoComplete="password"
            />
            <input type="submit" value="Sign In" />
            <button type="button" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
        </form>
    );
};

export default SignIn;
