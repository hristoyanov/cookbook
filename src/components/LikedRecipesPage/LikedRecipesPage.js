import { useState, useEffect } from 'react';

import { useAuthContext } from '../../contexts/AuthContext';
import { getUserProfile, getUserLikedRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';


const LikedRecipesPage = ({ match }) => {
    const user = useAuthContext();

    const [recipes, setRecipes] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfile(match.params.id)
            .then(res => {
                setUserProfile(res);
            });

        getUserLikedRecipes(match.params.id)
            .then(res => {
                setRecipes(res);
            })
            .catch(error => console.log(error));
    }, [match]);

    return (
        userProfile?.userUID ?
            <section className="user-recipes">
                <h1 className="user-recipes-title">
                    {userProfile?.userUID === user?.uid ? 'My liked recipes' : `${userProfile?.displayName}'s liked recipes`}
                </h1>
                {recipes.length > 0
                    ?
                    <ul className="user-recipes-list">
                        {recipes.map(x =>
                            <RecipeCard key={x.id} {...x} />
                        )}
                    </ul>
                    :
                    (user?.uid === match.params.id ? 'You haven\'t liked any recipes yet.' : `${userProfile?.displayName} hasn't liked any recipes.`)}
            </section>
            : null
    );
}

export default LikedRecipesPage;
