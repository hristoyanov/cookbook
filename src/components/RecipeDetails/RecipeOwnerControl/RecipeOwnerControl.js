import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import ConfirmDialog from '../../common/ConfirmDialog/ConfirmDialog';
import { deleteRecipe, deleteRecipeImage } from '../../../services/services';

import './RecipeOwnerControl.css';


const RecipeOwnerControl = ({
    id,
    recipe,
    ownerId,
    history
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const user = useAuthContext();

    const deleteHandler = () => {
        deleteRecipe(id)
            .then(() => {
                deleteRecipeImage(recipe.imageURL);
            })
            .then(() => {
                history.push(`/users/${user.uid}/recipes`);
            });
    }

    const onDeleteClickHandler = () => {
        if (ownerId === user.uid) {
            setShowDeleteDialog(true);
        }
    }

    return (
        <div className="recipe-details-buttons-container">
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} title="Delete this recipe?" />
            <button className="edit-btn" onClick={() => history.push(`/recipes/${id}/edit`)}>Edit</button>
            <button className="delete-btn" onClick={onDeleteClickHandler}>Delete</button>
        </div>
    );
}

export default RecipeOwnerControl;
