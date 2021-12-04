import { Link } from 'react-router-dom';


const GuestSection = () => {
    return (
        <>
            <article className="landing-page-actions-sign-up-cta">
                <h2 className="landing-page-actions-sign-up-cta-title">
                    Don't have an account?
                </h2>
                <p className="landing-page-actions-sign-up-cta-text">
                    Sign up and start adding recipes!
                </p>
                <Link to="/sign-up">
                    <button className="sign-up-cta-btn">Sign Up</button>
                </Link>
            </article>
            <article className="landing-page-actions-sign-in-cta">
                <h2 className="landing-page-actions-sign-in-cta-title">
                    Already registered?
                </h2>
                <p className="landing-page-actions-sign-in-cta-text">
                    Sign in and view your recipes.
                </p>
                <Link to="/sign-in">
                    <button className="sign-in-cta-btn">Sign In</button>
                </Link>
            </article>
        </>
    );
}

export default GuestSection;
