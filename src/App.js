import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { auth, signOut } from './firebase';

import AuthContext from './contexts/AuthContext';

import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LandingPage from './components/LandingPage/LandingPage';
import Catalog from './components/Catalog/Catalog';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import LikedRecipesPage from './components/LikedRecipesPage/LikedRecipesPage';
import RecipeForm from './components/RecipeForm/RecipeForm';

import './App.css';


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    const location = useLocation();

    return (
        <AuthContext.Provider value={user}>
            <div className="container">
                {location.pathname === "/" ? null : <Header user={user} />}

                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/recipes" exact component={Catalog} />
                    <Route path="/recipes/:id/details" exact component={RecipeDetails} />
                    <Route path="/recipes/add" render={({ history }) => (
                        <RecipeForm mode={'Add'} history={history} />
                    )} />
                    <Route path="/recipes/:id/edit" render={({ match, history }) => (
                        <RecipeForm mode={'Edit'} id={match.params.id} history={history} />
                    )} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-out" render={() => {
                        signOut(auth);

                        return <Redirect to="/recipes" />
                    }} />
                    <Route path="/users/:id/recipes" exact component={UserProfilePage} />
                    <Route path="/users/:id/recipes/liked" exact component={LikedRecipesPage} />
                </Switch>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
