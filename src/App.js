import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { getAuth, signOut } from './firebase';

import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LandingPage from './components/LandingPage/LandingPage';
import Catalog from './components/Catalog/Catalog';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import AddRecipe from './components/AddRecipe/AddRecipe';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import LikedRecipesPage from './components/LikedRecipesPage/LikedRecipesPage';

import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getAuth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    const location = useLocation();

    return (
        <div className="container">
            {location.pathname === "/" ? null : <Header user={user} />}

            <Switch>
                <Route path="/" exact render={() => (
                    <LandingPage user={user} />
                )} />
                <Route path="/recipes" exact component={Catalog} />
                <Route path="/recipes/:id/details" render={({ match }) => (
                    <RecipeDetails id={match.params.id} user={user} />
                )} />
                <Route path="/recipes/add" component={AddRecipe} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" render={() => {
                    signOut(getAuth());

                    localStorage.removeItem('user');

                    return <Redirect to="/recipes" />
                }} />
                <Route path="/users/:id/recipes" exact render={({ match }) => (
                    <UserProfilePage id={match.params.id} currentUser={user} />
                )} />
                <Route path="/users/:id/recipes/liked" exact render={({ match }) => (
                    <LikedRecipesPage id={match.params.id} user={user} />
                )} />
            </Switch>
        </div>
    );
}

export default App;
