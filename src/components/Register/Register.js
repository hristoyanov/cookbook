import { getAuth, createUserWithEmailAndPassword } from '../../firebase';


const Register = ({ history }) => {
    const onRegisterSubmitHandler = (e) => {
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

                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
            });
    }

    return (
        <section className="register">
            <form onSubmit={onRegisterSubmitHandler}>
                    <legend>Register</legend>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                    <label htmlFor="repeat-password">Repeat Password</label>
                    <input type="password" name="passwordRepeat" id="repeat-password" required/>
                    <button className="submit-btn">Register</button>
            </form>
        </section>
    );
}

export default Register;
