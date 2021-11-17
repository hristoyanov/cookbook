import { Link } from 'react-router-dom';

import './RecipeCard.css';

const RecipeCard = ({
    id,
    name,
    imageURL,
    prepTime,
    likes
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
            <div className="recipes-list-item-likes">
                {likes.length === 1
                    ? '1 like'
                    : likes.length + ' likes'}
            </div>
            <Link to={`/recipes/${id}/details`}>
                <button className="recipes-list-item-details-btn">Details</button>
            </Link>
        </li>
    );
}

export default RecipeCard;
