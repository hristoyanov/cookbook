import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import { getUserProfile, getUserRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';

import './UserProfilePage.css';


const UserProfilePage = ({ match }) => {
    const user = useContext(AuthContext);

    const [recipes, setRecipes] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfile(match.params.id)
            .then(res => {
                setUserProfile(res);
            });

        if (user && user.uid === match.params.id) {
            getUserRecipes(match.params.id)
                .then(res => {
                    setRecipes(res)
                })
                .catch(error => console.log(error));
        } else {
            getUserRecipes(match.params.id, true)
                .then(res => {
                    setRecipes(res)
                })
                .catch(error => console.log(error));
        }
    }, [match]);

    return (
        userProfile.displayName
            ?
            <section className="user-recipes">
                <h1 className="user-recipes-title">
                    {user && user.uid === userProfile.userUID ? 'My recipes' : `${userProfile.displayName}'s recipes`}
                </h1>
                {recipes.length > 0
                    ?
                    <ul className="user-recipes-list">
                        {recipes.map(x =>
                            <RecipeCard key={x.id} {...x} />
                        )}
                    </ul>
                    :
                    <h3>No recipes yet.</h3>}
                {user.uid !== userProfile.userUID
                    ? <Link to={`/users/${userProfile.userUID}/recipes/liked`} className='user-liked-recipes-link'>Liked</Link>
                    : null
                }
            </section>
            :
            <h1 className="placeholder-title">
                Loading data...
            </h1>
    );
}

export default UserProfilePage;
