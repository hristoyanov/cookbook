import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getAuth, signOut } from './firebase';

import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LandingPage from './components/LandingPage/LandingPage';
import Catalog from './components/Catalog/Catalog';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import AddRecipe from './components/AddRecipe/AddRecipe';

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

    const authInfo = {
        isAuthenticated: Boolean(user),
        email: user?.email
    }

    return (
        <div className="container">
            <Header />

            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/recipes" exact component={Catalog} />
                <Route path="/recipes/details/:id" exact component={RecipeDetails} />
                <Route path="/recipes/add" component={AddRecipe} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-out" render={() => {
                    signOut(getAuth());

                    return <Redirect to="/" />
                }} />
            </Switch>
        </div>
    );
}

export default App;
