import { useEffect, useState } from "react";

import { getRecipe } from '../../services/services';

import './RecipeDetails.css';

const RecipeDetails = ({ match }) => {
    let [recipe, setRecipe] = useState({ isLoading: true });

    useEffect(() => {
        getRecipe(match.params.id)
            .then(res => setRecipe(res))
            .catch(error => console.log(error));
    }, [match]);

    return (
        recipe.isLoading
            ? <h1>Loading recipe...</h1>
            :
            <section className="recipe-details">
                <h1 className="recipe-details-title">
                    {recipe.name}
                </h1>
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
            </section>
    );
}

export default RecipeDetails;
