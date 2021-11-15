import { Link } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => {
    return (
            <section className="landing-page">
                <header className="landing-page-header">
                    <h1 className="landing-page-header-title">
                        Welcome to Cookbook!
                    </h1>
                    <p className="landing-page-header-text">
                        Add your favourite recipes or find something new. Like something? Add it to your collection.
                    </p>
                </header>
                <div className="landing-page-actions">
                    <article className="landing-page-actions-view-recipes">
                        <h2 className="landing-page-actions-view-recipes-title">
                            Browse recipes
                        </h2>
                        <p className="landing-page-actions-view-recipes-text">
                            View recipes our users have marked as public.
                        </p>
                        <Link to="/recipes">
                            <button className="browse-recipes-btn">Browse</button>
                        </Link>
                    </article>
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
                </div>
            </section>
    );
}

export default LandingPage;
