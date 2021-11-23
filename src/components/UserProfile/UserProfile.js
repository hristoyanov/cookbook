import { useState, useEffect } from 'react';

import { getUserProfile, getUserRecipes } from '../../services/services';
import UserRecipesList from '../UserRecipesList/UserRecipesList';

const UserProfile = ({
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

        if (currentUser && currentUser.uid === userProfile.userUID) {
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
        <section className="user-recipes">
            <h1 className="user-recipes-title">
                {currentUser && userProfile.userUID && currentUser.uid === userProfile.userUID ? 'My recipes' : `${userProfile.displayName}'s recipes`}
            </h1>
            {userProfile.displayName
                ?
                <UserRecipesList recipes={recipes} />
                :
                <h1 className="placeholder-title">
                    Loading data...
                </h1>
            }
        </section>
    );
}

export default UserProfile;
