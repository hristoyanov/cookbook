import { auth, signInWithEmailAndPassword } from '../../firebase';


const SignIn = ({ history }) => {
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
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    }

    return (
        <section className="sign-in">
            <form onSubmit={onSignInSubmitHandler}>
                <legend>Sign In</legend>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                <button className="submit-btn">Sign In</button>
            </form>
        </section>
    );
}

export default SignIn;
