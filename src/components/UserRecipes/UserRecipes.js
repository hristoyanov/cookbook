import { useState, useEffect } from 'react';

import { getUserProfile, getUserRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';

const UserRecipes = ({
    id,
    currentUser
}) => {
    const [recipes, setRecipes] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfile(id)
            .then(res => {
                setUserProfile(res);
            });

        if ((currentUser && currentUser.uid) && userProfile.userUID && currentUser.uid === userProfile.userUId) {
            getUserRecipes(id)
                .then(res => {
                    setRecipes(res)
                })
                .catch(error => console.log(error));
        } else {
            getUserRecipes(id, true)
                .then(res => {
                    setRecipes(res)
                })
                .catch(error => console.log(error));
        }
    }, [id]);

    return (
        currentUser && currentUser.uid && userProfile.userUID ?
            <section className="user-recipes">
                <h1 className="user-recipes-title">
                    {userProfile.userUID === currentUser.uid ? 'My recipes' : `${userProfile.displayName}'s recipes`}
                </h1>
                <ul className="user-recipes-list">
                    {recipes.map(x =>
                        <RecipeCard key={x.id} {...x} />
                    )}
                </ul>
            </section>
            : null
    );
}

export default UserRecipes;