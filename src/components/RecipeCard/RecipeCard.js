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
                <i className="far fa-clock"></i>{prepTime} minutes
            </div>
                <Link to={`/recipes/details/${id}`}>
                    <button className="recipes-list-item-details-btn">Details</button>
                </Link>
        </li>
    );
}

export default Recipe;
