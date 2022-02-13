import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { auth, signInWithEmailAndPassword } from '../../firebase';

const SignIn = ({ history }) => {
    const [errors, setErrors] = useState({ email: false, password: false });

    const onSignInSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log('Signed in as ' + user.email);

                history.push('/recipes');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setErrors(state => ({ ...state, email: 'No such user.' }));
                } else {
                    setErrors(state => ({ ...state, email: false }));
                }

                if (error.code === 'auth/wrong-password') {
                    setErrors(state => ({ ...state, password: 'Wrong password.' }));
                } else {
                    setErrors(state => ({ ...state, password: false }));
                }

                console.log(error.code, error.message);
            });
    }

    return (
        sessionStorage.getItem('user')
            ? <Redirect to="/recipes" />
            :
            <section className="sign-in">
                <form className="sign-in-form" onSubmit={onSignInSubmitHandler}>
                    <legend>Sign In</legend>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                    <span className={errors.email ? 'error visible' : 'error'}>{errors.email}</span>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <span className={errors.password ? 'error visible' : 'error'}>{errors.password}</span>
                    <button className="submit-btn">Sign In</button>
                </form>
            </section>
    );
}

export default SignIn;
