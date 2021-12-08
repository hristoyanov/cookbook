import { useAuthContext } from '../../contexts/AuthContext';
import { deleteRecipe } from '../../services/services';

import './RecipeOwnerControl.css';


const RecipeOwnerControl = ({
    id,
    ownerId,
    history
}) => {
    const user = useAuthContext();

    async function onDeleteClickHandler(e) {
        e.preventDefault();

        if (ownerId === user.uid) {
            const confirmed = window.confirm('Delete this recipe?');

            if (confirmed) {
                await deleteRecipe(id);

                history.push(`/users/${user.uid}/recipes`);
            }
        }
    }

    return (
        <div className="recipe-details-buttons-container">
            <button className="edit-btn" onClick={() => history.push(`/recipes/${id}/edit`)}>Edit</button>
            <button className="delete-btn" onClick={onDeleteClickHandler}>Delete</button>
        </div>
    );
}

export default RecipeOwnerControl;
