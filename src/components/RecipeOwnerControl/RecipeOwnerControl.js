import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog';
import { deleteRecipe } from '../../services/services';

import './RecipeOwnerControl.css';


const RecipeOwnerControl = ({
    id,
    ownerId,
    history
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const user = useAuthContext();

    const deleteHandler = () => {
        deleteRecipe(id)
            .then(() => {
                history.push(`/users/${user.uid}/recipes`);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    }

    const onDeleteClickHandler = (e) => {
        e.preventDefault();

        if (ownerId === user.uid) {
            setShowDeleteDialog(true);
        }
    }

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} title="Delete this recipe?" />
            <div className="recipe-details-buttons-container">
                <button className="edit-btn" onClick={() => history.push(`/recipes/${id}/edit`)}>Edit</button>
                <button className="delete-btn" onClick={onDeleteClickHandler}>Delete</button>
            </div>
        </>
    );
}

export default RecipeOwnerControl;
