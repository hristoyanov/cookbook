import { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import GuestSection from './GuestSection/GuestSection';

import './LandingPage.css';

const LandingPage = () => {
    const user = useContext(AuthContext);

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
                {!user ? <GuestSection /> : <Redirect to="/recipes"/>}
            </div>
        </section>
    );
}

export default LandingPage;
