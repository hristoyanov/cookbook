import { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { getUserProfile, getRecipe } from '../../services/services';
import RecipeOwnerControl from '../RecipeOwnerControl/RecipeOwnerControl';
import RecipeLikes from '../RecipeLikes/RecipeLikes';

import './RecipeDetails.css';

const RecipeDetails = (props) => {
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getRecipe(props.id)
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
    }, [props.id, recipe.ownerId]);

    return (
        isLoading
            ? <h1>Loading recipe...</h1>
            :
            <section className="recipe-details">
                <h1 className="recipe-details-title">
                    {recipe.name}
                </h1>
                {props.user && props.user.uid === recipe.ownerId ? <RecipeOwnerControl id={props.id} ownerId={recipe.ownerId} user={props.user} history={props.history} recipe={recipe}/> : ''}
                <div className="recipe-details-prep-time">
                    <i className="far fa-clock"></i>{recipe.prepTime} minutes
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
                {props.user && <RecipeLikes likesArr={recipe.likes} recipeId={props.id} user={props.user} />}
            </section>
    );
}

export default withRouter(RecipeDetails);
