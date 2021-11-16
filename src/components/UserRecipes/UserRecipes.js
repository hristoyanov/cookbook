import { useState, useEffect } from 'react';

import { getUserRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';

const UserRecipes = ({
    user,
    id
}) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getUserRecipes(id)
            .then(res => {
                setRecipes(res)
            });
    }, [id]);

    return (
        user && user.uid ?
        <section className="user-recipes">
            <h1 className="user-recipes-title">
                {`${user.displayName}'s recipes`}
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
