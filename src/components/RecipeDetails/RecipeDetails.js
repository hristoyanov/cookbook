import { useEffect, useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import { getUserProfile, getRecipe } from '../../services/services';
import RecipeOwnerControl from '../RecipeOwnerControl/RecipeOwnerControl';
import RecipeLikes from '../RecipeLikes/RecipeLikes';

import './RecipeDetails.css';


const RecipeDetails = ({
    match,
    history
}) => {
    const user = useContext(AuthContext);

    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getRecipe(match.params.id)
            .then(res => {
                setRecipe(res);
                setIsLoading(false);
            })
            .catch(error => console.log(error));

        if (recipe.ownerId) {
            getUserProfile(recipe.ownerId)
                .then(res => {
                    setUserProfile(res);
                })
                .catch(error => console.log(error));
        }
    }, [match, recipe.ownerId]);

    return (
        isLoading
            ? <h1>Loading recipe...</h1>
            :
            recipe.hidden
            ? <h1>This recipe is private.</h1>
            :
            <section className="recipe-details">
                <h1 className="recipe-details-title">
                    {recipe.name}
                </h1>
                {user && user.uid === recipe.ownerId ? <RecipeOwnerControl id={match.params.id} ownerId={recipe.ownerId} history={history} recipe={recipe} /> : ''}
                <div className="recipe-details-prep-time">
                    <i className="far fa-clock"></i>{recipe.prepTime} {recipe.prepTime === 1 ? 'minute' : 'minutes'}
                </div>
                <article className="recipe-details-content">
                    <div className="recipe-details-content-img">
                        <img src={recipe.imageURL} alt="recipe-img" />
                    </div>
                    <div className="recipe-details-content-ingredients">
                        <h2 className="recipe-details-content-ingredients-heading">
                            Ingredients:
                        </h2>
                        <ul className="recipe-details-content-ingredients-list">
                            {recipe.ingredients.map((x, i) =>
                                <li className="recipe-details-content-ingredients-list-item" key={i}>{x}</li>)}
                        </ul>
                    </div>
                    <div className="recipe-details-content-preparation">
                        <h2 className="recipe-details-content-preparation-heading">
                            Preparation:
                        </h2>
                        <div className="recipe-details-content-preparation-text">
                            {recipe.preparation}
                        </div>
                    </div>
                </article>
                <div className="recipe-details-author-container">
                    Created by:
                    <Link to={`/users/${recipe.ownerId}/recipes`} className="recipe-details-author">
                        {userProfile.displayName}
                    </Link>
                </div>
                {!user || user?.uid === recipe?.ownerId ? null : <RecipeLikes likesArr={recipe.likes} recipeId={match.params.id} />}
            </section>
    );
}

export default withRouter(RecipeDetails);
