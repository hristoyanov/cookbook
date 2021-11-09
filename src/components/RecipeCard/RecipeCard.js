import { Link } from "react-router-dom";

import './RecipeCard.css';

const Recipe = ({
    id,
    name,
    imageURL,
    prepTime
}) => {
    return (
        <li className="recipes-list-item">
            <h3 className="recipes-list-item-title">
                {name}
            </h3>
            <div className="recipes-list-item-img">
                <img src={imageURL} alt="recipe-img" />
            </div>
            <div className="recipes-list-item-prep-time">
                <i class="far fa-clock"></i>{prepTime} minutes
            </div>
            <button className="recipes-list-item-details-btn">
                <Link to={`/recipes/details/${id}`}>Details</Link>
            </button>
        </li>
    );
}

export default Recipe;
