import { Link } from 'react-router-dom';

import './RecipeCard.css';


const RecipeCard = ({
    id,
    name,
    imageURL,
    prepTime,
    likes,
    comments
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
                <i className="far fa-clock"></i>{prepTime} {prepTime === 1 ? 'minute' : 'minutes'}
            </div>
            <div className="recipes-list-item-likes-comments-count">
                <i className="fas fa-heart"></i> {likes.length} / <i className="fas fa-comment"></i> {comments.length}
            </div>
            <Link to={`/recipes/${id}/details`}>
                <button className="recipes-list-item-details-btn">Details</button>
            </Link>
        </li>
    );
}

export default RecipeCard;
