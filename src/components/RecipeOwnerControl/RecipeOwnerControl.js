import { deleteRecipe } from '../../services/services';

import './RecipeOwnerControl.css';

const RecipeOwnerControl = ({
    id,
    ownerId,
    user,
    history
}) => {
    async function onDeleteClickHandler(e) {
        e.preventDefault();

        if (ownerId === user.uid) {
            const confirmed = window.confirm('Delete this recipe?');

            if (confirmed) {
                await deleteRecipe(id);

                history.push('/');
            }
        }
    }

    return (
        <div className="recipe-details-buttons-container">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn" onClick={onDeleteClickHandler}>Delete</button>
        </div>
    );

}

export default RecipeOwnerControl;
