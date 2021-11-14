import { useState } from "react";

import { getRecipe, updateRecipeLikes } from '../../services/services';

const RecipeLikes = ({
    recipeId,
    likesArr,
    user
}) => {
    const [likes, setLikes] = useState(likesArr);

    async function onLikeHandler() {
        const liked = likes.includes(user.uid);

        await updateRecipeLikes(recipeId, user.uid, liked);
        const recipeRef =  await getRecipe(recipeId);

        setLikes(recipeRef.likes);
    }

    return (
        <div className="recipe-details-likes">
            <p className="recipe-details-likes-count">
                {likes.length === 1 ? '1 like' : likes.length + ' likes'}
            </p>
            <button className="recipe-details-likes-btn" onClick={onLikeHandler}>
                {likes.includes(user.uid) ? 'Unlike' : 'Like'}
            </button>
        </div>
    );
}

export default RecipeLikes;
