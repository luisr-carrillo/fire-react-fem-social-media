import React from 'react';
import useFormFields from '../hooks/useFormFields';
import { auth, createUserProfileDocument } from '../firebase';

const SignUp = () => {
    const [newUserFields, setNewUserFields] = useFormFields({
        displayName: '',
        email: '',
        password: '',
    });
    const { displayName, email, password } = newUserFields;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            createUserProfileDocument(user, { displayName });
        } catch (error) {
            console.log('Error de firebase: ', error);
        }

        setNewUserFields();
    };

    return (
        <form className="SignUp" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={displayName}
                onChange={setNewUserFields}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={setNewUserFields}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={password}
                onChange={setNewUserFields}
            />
            <input type="submit" value="Sign Up" />
        </form>
    );
};

export default SignUp;
