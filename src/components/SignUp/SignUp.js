import { getAuth, createUserWithEmailAndPassword } from '../../firebase';


const SignUp = ({ history }) => {
    const onSignUpSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const passwordRepeat = e.target.passwordRepeat.value.trim();

        if (password != passwordRepeat) {
            return alert('Passwords don\'t match!');
        }

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                history.push('/');

                console.log('Signed in as ' + user.email);
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
