import { useState, useEffect } from 'react';

import { getUserLikedRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';

const LikedRecipesPage = ({
    id
}) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getUserLikedRecipes(id)
            .then(res => {
                setRecipes(res)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <section className="user-recipes">
            <h1 className="user-recipes-title">
                My liked recipes
            </h1>
            {recipes.length > 0
                ?
                <ul className="user-recipes-list">
                    {recipes.map(x =>
                        <RecipeCard key={x.id} {...x} />
                    )}
                </ul>
                :
                'You haven\'t liked any recipes yet.'}
        </section>
    );
}

export default LikedRecipesPage;
