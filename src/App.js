import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getAuth, signOut } from './firebase';

import Header from './components/Header/Header';
import Register from './components/Register/Register';
import LandingPage from './components/LandingPage/LandingPage';
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
                <Route path="/recipes/add" component={AddRecipe} />
                <Route path="/register" component={Register} />
                <Route path="/logout" render={() => {
                    signOut(getAuth());

                    return <Redirect to="/" />
                }} />
            </Switch>
        </div>
    );
}

export default App;
