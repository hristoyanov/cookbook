import { useState } from 'react';

import AlertWindow from '../common/AlertWindow/AlertWindow';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../firebase';
import { createUserProfile } from '../../services/services';
import * as validators from './signUpFormValidators';


const SignUp = ({ history }) => {
    const [showAlertWindow, setShowAlertWindow] = useState(false);
    const [errors, setErrors] = useState({ displayName: false, password: false });

    const onSignUpSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const displayName = validators.displayNameValidator(e.target.displayName.value.trim());
        const password = validators.passwordValidator(e.target.password.value.trim());
        const passwordRepeat = e.target.passwordRepeat.value.trim();

        if (!displayName) {
            setErrors(state => ({ ...state, displayName: 'Display name should be at least 3 characters long.' }));

            return;
        } else {
            setErrors(state => ({ ...state, displayName: false }));
        }

        if (!password) {
            setErrors(state => ({ ...state, password: 'Password should be at least 6 characters long.' }));

            return;
        } else {
            setErrors(state => ({ ...state, password: false }));
        }

        if (password !== passwordRepeat) {
            setShowAlertWindow(true);

            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: displayName
                });

                createUserProfile(user.uid, displayName);

                history.push('/recipes');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    }

    return (
        <section className="sign-up">
            <form onSubmit={onSignUpSubmitHandler}>
                <legend>Sign Up</legend>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="display-name">Display Name/Username</label>
                <input type="text" name="displayName" id="display-name" />
                <span className={errors.displayName ? 'error visible' : 'error'}>{errors.displayName}</span>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <span className={errors.password ? 'error visible' : 'error'}>{errors.password}</span>
                <label htmlFor="repeat-password">Repeat Password</label>
                <input type="password" name="passwordRepeat" id="repeat-password" required />
                <button className="submit-btn">Sign Up</button>
            </form>
            <AlertWindow show={showAlertWindow} onClose={() => setShowAlertWindow(false)} title="Passwords don't match!" />
        </section>
    );
}

export default SignUp;
