import { getAuth, createUserWithEmailAndPassword } from '../../firebase';

import { createUserProfile } from '../../services/services';

const SignUp = ({ history }) => {
    const onSignUpSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const displayName = e.target.displayName.value.trim();
        const password = e.target.password.value.trim();
        const passwordRepeat = e.target.passwordRepeat.value.trim();

        if (password !== passwordRepeat) {
            return alert('Passwords don\'t match!');
        }

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                localStorage.setItem('user', user);
                console.log('Signed in as ' + user.email);
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
                <input type="text" name="email" id="email" required />
                <label htmlFor="display-name">Display Name/Username</label>
                <input type="text" name="displayName" id="display-name" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                <label htmlFor="repeat-password">Repeat Password</label>
                <input type="password" name="passwordRepeat" id="repeat-password" required />
                <button className="submit-btn">Sign Up</button>
            </form>
        </section>
    );
}

export default SignUp;
