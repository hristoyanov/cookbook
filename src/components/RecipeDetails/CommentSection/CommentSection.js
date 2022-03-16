import { useState, useEffect, createRef } from 'react';

import Comment from './Comment/Comment';
import ConfirmDialog from '../../common/ConfirmDialog/ConfirmDialog';
import { getRecipe, addRecipeComment, modifyRecipeComment } from '../../../services/services';

import './CommentSection.css';


const CommentSection = ({
    user,
    recipe,
    recipeId
}) => {
    const [recipeComments, setRecipeComments] = useState(recipe.comments);
    const [commentToEdit, setCommentToEdit] = useState({});
    const [commentToDelete, setCommentToDelete] = useState({});
    const [commentCounter, setCommentCounter] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        getRecipe(recipeId)
            .then(res => {
                setRecipeComments([...res.comments]);
            })
            .catch(error => console.log(error));
    }, [recipeId, commentCounter]);

    const commentTextAreaRef = createRef();

    const commentHandler = () => {
        const content = commentTextAreaRef.current.value.trim();

        if (!content) {
            return;
        }

        if (!commentToEdit.id) {
            addRecipeComment(recipeId, user.uid, user.displayName, content)
                .then(() => {
                    setCommentCounter(state => state + 1);

                })
                .catch(error => console.log(error));
        } else {
            modifyRecipeComment(recipeId, user, content, commentToEdit)
                .then(() => {
                    setCommentToEdit({});
                    setCommentCounter(state => state + 1);

                })
                .catch(error => console.log(error));
        }

        commentTextAreaRef.current.value = '';
    }

    const editCommentClickHandler = (commentId) => {
        const oldComment = recipeComments.find(x => x.id === commentId);

        setCommentToEdit(oldComment);

        commentTextAreaRef.current.focus();
        commentTextAreaRef.current.value = oldComment.content;
    }

    const deleteCommentHandler = () => {
        modifyRecipeComment(recipeId, user, null, commentToDelete)
            .then(() => {
                commentTextAreaRef.current.value = '';

                setCommentToDelete({});
                setCommentCounter(state => state + 1);
            })
            .catch(error => console.log(error))
            .finally(() => {
                setShowDeleteDialog(false);
            });
    }

    const deleteCommentClickHandler = (commentId) => {
        const comment = recipeComments.find(x => x.id === commentId);

        setCommentToDelete(comment);
        setShowDeleteDialog(true);
    }

    return (
        <div className="comment-section">
            {user ?
                <div className="comment-section-add-comment">
                    <textarea ref={commentTextAreaRef} name="comment-area" id="comment-area" cols="30" rows="10" placeholder="Leave a comment."></textarea>
                    <button className="add-comment-btn" onClick={commentHandler}>Submit comment</button>
                </div>
                : null}
            <div className="comment-section-comments">
                <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteCommentHandler} title="Delete this comment?" />
                <h2 className="comment-section-comments-heading">
                    Comments
                </h2>
                {recipeComments.length > 0
                    ?
                    recipeComments.sort((a, b) => b.createdAt - a.createdAt).map(x =>
                        <Comment key={x.id} user={user} editCommentHandler={editCommentClickHandler} deleteCommentHandler={deleteCommentClickHandler} {...x} />
                    )
                    : <p>No comments yet.</p>}
            </div>
        </div>
    );
}

export default CommentSection;
