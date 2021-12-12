import { Switch, Route, Redirect } from 'react-router-dom';

import { auth, signOut } from './firebase';
import { AuthProvider } from './contexts/AuthContext';
import isAuth from './hoc/isAuth';

import CustomErrorBoundary from './components/common/CustomErrorBoundary/CustomErrorBoundary';
import PageNotFound from './components/common/PageNotFound/PageNotFound';
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
    return (
        <CustomErrorBoundary>
            <AuthProvider>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={LandingPage} />
                        <Route path="/recipes" exact component={Catalog} />
                        <Route path="/recipes/:id/details" exact component={RecipeDetails} />
                        <Route path="/recipes/add" render={props => <RecipeForm {...props} mode={'Add'} />} />
                        <Route path="/recipes/:id/edit" render={props => <RecipeForm {...props} mode={'Edit'} />} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-out" render={() => {
                            signOut(auth);

                            return <Redirect to="/recipes" />
                        }} />
                        <Route path="/users/:id/recipes" exact component={isAuth(UserProfilePage)} />
                        <Route path="/users/:id/recipes/liked" exact component={isAuth(LikedRecipesPage)} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </AuthProvider>
        </CustomErrorBoundary>
    );
}

export default App;
